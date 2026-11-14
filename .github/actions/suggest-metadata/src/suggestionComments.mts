import {
  EXTENDS_PREFIX,
  GROUP_PREFIX,
  METADATA_FIELDS,
  isExtendsMarker,
  isGroupMarker,
  isMarker,
  looksLikeMarker,
  type Group,
  type Metadata,
  type MetadataField,
} from './metadata.mts';
import { type IconIndex } from './iconIndex.mts';
import { type MetadataSuggestion } from './model.mts';
import { type PreviousSuggestions } from './pullRequest.mts';

export type ReviewComment = {
  path: string;
  body: string;
  line: number;
  side: 'RIGHT';
  start_line?: number;
  start_side?: 'RIGHT';
};

type SuggestedIcon = {
  filename: string;
  iconName: string;
  fileContent: string;
  currentMetadata: Metadata;
  suggested: MetadataSuggestion;
};

type CommentContext = PreviousSuggestions & {
  index: IconIndex;
  groups: Record<string, Group>;
};

// Render an array property exactly as it should appear in the metadata JSON,
// preserving the repo's 2-space indentation and the original trailing comma.
function buildArrayBlock(field: MetadataField, values: string[], trailingComma: string) {
  const indent = '  ';
  const itemIndent = '    ';

  if (values.length === 0) {
    return `${indent}"${field}": []${trailingComma}`;
  }

  const items = values.map((value) => `${itemIndent}${JSON.stringify(value)}`).join(',\n');
  return `${indent}"${field}": [\n${items}\n${indent}]${trailingComma}`;
}

function getNewMetadataValues(
  field: MetadataField,
  currentValues: string[],
  suggestedValues: string[],
  iconName: string,
) {
  const normalize = (value: string) => value.trim().toLowerCase().replaceAll(/\s+/g, ' ');
  const seenValues = new Set(currentValues.map(normalize));
  const excludedTags = new Set(
    [iconName, iconName.replaceAll('-', ' '), ...iconName.split('-')].map(normalize),
  );

  return suggestedValues.reduce<string[]>((newValues, value) => {
    const normalizedValue = normalize(value);

    if (
      !normalizedValue ||
      seenValues.has(normalizedValue) ||
      (field === 'tags' && excludedTags.has(normalizedValue))
    ) {
      return newValues;
    }

    seenValues.add(normalizedValue);
    newValues.push(value.trim());
    return newValues;
  }, []);
}

// Words that say little about what a use-case means.
const USE_CASE_STOPWORDS = new Set(
  'a an the and or of in on for to with as at by from into onto via its it is are be this that their your his her our app apps application applications'.split(
    ' ',
  ),
);

// The words to compare use-cases by: lowercase letters only, without the
// leading verb the format starts with, stopwords and short words, and cut to
// their first 5 letters so `matching` and `match` meet. Only used to compare;
// the suggested text keeps its own wording.
function getUseCaseWords(useCase: string) {
  return new Set(
    useCase
      .toLowerCase()
      .replace(/[^a-z]+/g, ' ')
      .trim()
      .split(' ')
      .slice(1)
      .filter((word) => word.length > 2 && !USE_CASE_STOPWORDS.has(word))
      .map((word) => word.slice(0, 5)),
  );
}

// Whether a use-case restates one of the others in different words: at least
// 3 in 4 words of the shorter one are shared. Tuned on rewrites the model made
// of a pull request's own use-cases, and on the distinct use-cases icons
// already have, of which only a few score this high.
function restatesUseCase(useCase: string, others: string[]) {
  const words = getUseCaseWords(useCase);

  return others.some((other) => {
    const otherWords = getUseCaseWords(other);
    const shared = [...words].filter((word) => otherWords.has(word)).length;
    return shared / Math.max(1, Math.min(words.size, otherWords.size)) >= 0.75;
  });
}

// Render only the values to append to an existing multi-line array: the
// current last item (now with a trailing comma) followed by the new values,
// using the same indentation as the existing items.
function buildAppendBlock(lastItemText: string, values: string[]) {
  const itemIndent = lastItemText.match(/^\s*/)![0];
  const lastItem = lastItemText.trimEnd();
  const items = values.map((value) => `${itemIndent}${JSON.stringify(value)}`).join(',\n');
  return `${lastItem.endsWith(',') ? lastItem : `${lastItem},`}\n${items}`;
}

// Locate the line range of an array property in the raw file so we can anchor a
// GitHub suggestion to it. Handles both inline (`"use-cases": []`) and
// multi-line arrays, and reports whether the closing line has a trailing comma.
// For non-empty multi-line arrays it also returns the line of the last item, so
// new values can be suggested right after it.
function findFieldBlock(lines: string[], field: MetadataField) {
  const startIdx = lines.findIndex((line) => line.trimStart().startsWith(`"${field}":`));
  if (startIdx === -1) return null;

  let endIdx = startIdx;
  if (!lines[startIdx].includes(']')) {
    for (let i = startIdx + 1; i < lines.length; i++) {
      endIdx = i;
      if (lines[i].trimStart().startsWith(']')) break;
    }
  }

  const trailingComma = lines[endIdx].trim().endsWith(',') ? ',' : '';
  const lastItemLine = endIdx - 1 > startIdx ? endIdx : undefined;
  return { startLine: startIdx + 1, endLine: endIdx + 1, lastItemLine, trailingComma };
}

// The markers to add to a field: the suggested base icon in tags and
// categories, and the suggested groups in tags. In tags, literals that hold
// every tag of a group get that group too, as `pnpm checkIcons` asks.
function getNewMarkers(
  field: MetadataField,
  current: string[],
  newValues: string[],
  baseName: string | null,
  suggestedGroups: string[],
  groups: Record<string, Group>,
) {
  if (field === 'use-cases') return [];

  const markers = baseName ? [`${EXTENDS_PREFIX}${baseName}`] : [];
  if (field === 'tags') {
    const literals = new Set([...current.filter((value) => !isMarker(value)), ...newValues]);
    const completedGroups = Object.keys(groups)
      .sort()
      .filter((name) => groups[name].tags.every((tag) => literals.has(tag)));

    markers.push(
      ...[...suggestedGroups, ...completedGroups]
        .filter((name) => groups[name])
        .map((name) => `${GROUP_PREFIX}${name}`),
    );
  }

  return [...new Set(markers)].filter((marker) => !current.includes(marker));
}

// Build one inline GitHub suggestion per field of an icon. Values are deduped
// case-insensitively against the current, inherited and previously suggested
// values, and tags already searchable through the icon name are omitted.
export function buildComments(
  { filename, iconName, fileContent, currentMetadata, suggested }: SuggestedIcon,
  { index, groups, previouslySuggestedValues, openSuggestions }: CommentContext,
): ReviewComment[] {
  const { resolvedIcons, getMarkerValues, getSuggestedBase } = index;
  const lines = fileContent.split('\n');
  const chatGptQuery = `Suggest tags, categories and use-cases for a "${iconName}" icon in the Lucide icon library.`;
  const base = getSuggestedBase(iconName, suggested.extends);

  return METADATA_FIELDS.flatMap((field) => {
    // The base icon is only extended in the fields its family extends it in.
    const baseName = base?.fields.some((baseField) => baseField === field) ? base.name : null;
    const current: string[] = currentMetadata[field];
    const previouslySuggested = previouslySuggestedValues.get(`${filename}:${field}`) ?? [];
    const resolved = field === 'use-cases' ? current : resolvedIcons[iconName][field];
    // Values the suggested and earlier suggested markers provide, so their
    // literals aren't suggested even when the marker itself isn't again.
    const markerValues = [
      ...(baseName ? [`${EXTENDS_PREFIX}${baseName}`] : []),
      ...suggested.groups.map((name) => `${GROUP_PREFIX}${name}`),
      ...previouslySuggested.filter(isMarker),
    ].flatMap((marker) => getMarkerValues(marker, field));

    const newValues = getNewMetadataValues(
      field,
      [...current, ...resolved, ...markerValues, ...previouslySuggested],
      suggested[field].filter((value) => !looksLikeMarker(value)),
      iconName,
    ).flatMap((value) => {
      if (field !== 'use-cases') return [value];

      if (restatesUseCase(value, [...current, ...previouslySuggested])) {
        console.log(`Dropped a use-case for ${iconName} that restates an existing one: ${value}`);
        return [];
      }

      // Use-cases start with a capitalized verb, such as "Representing".
      return [value.charAt(0).toUpperCase() + value.slice(1)];
    });
    const newMarkers = getNewMarkers(
      field,
      current,
      newValues,
      baseName,
      suggested.groups,
      groups,
    ).filter((marker) => !previouslySuggested.includes(marker));

    if (newValues.length === 0 && newMarkers.length === 0) {
      console.log(`No new ${field} to suggest for ${iconName}. Skipping...`);
      return [];
    }

    if (openSuggestions.has(`${filename}:${field}`)) {
      console.log(`An earlier ${field} suggestion for ${iconName} is still open. Skipping...`);
      return [];
    }

    const block = findFieldBlock(lines, field);
    if (!block) {
      console.log(`Could not locate "${field}" in ${filename}. Skipping...`);
      return [];
    }

    // New markers rewrite the whole array in the documented order: base
    // icons, groups, then the literals no marker provides yet.
    const markers = [...current.filter(isMarker), ...newMarkers];
    const providedValues = new Set(markers.flatMap((marker) => getMarkerValues(marker, field)));
    const values =
      newMarkers.length === 0
        ? [...current, ...newValues]
        : [
            ...markers.filter(isExtendsMarker),
            ...markers.filter(isGroupMarker),
            ...[...current.filter((value) => !isMarker(value)), ...newValues].filter(
              (value) => !providedValues.has(value),
            ),
          ];

    // Append the new values after the last item when possible, so the
    // suggestion only shows what is added. Empty and inline arrays, and
    // arrays that get a new marker, are replaced as a whole.
    const appendAfterLine = newMarkers.length === 0 ? block.lastItemLine : undefined;
    const suggestion = appendAfterLine
      ? buildAppendBlock(lines[appendAfterLine - 1], newValues)
      : buildArrayBlock(field, values, block.trailingComma);

    // A marker only shows its name, so list the values it adds.
    const markerNotes = newMarkers.map((marker) => {
      const markerValues = getMarkerValues(marker, field);
      return `- \`${marker}\` adds: ${markerValues.length > 0 ? markerValues.join(', ') : '(nothing yet)'}`;
    });

    const body = [
      `Suggested \`${field}\` for the \`${iconName}\` icon.`,
      ...markerNotes,
      '```suggestion',
      suggestion,
      '```',
      `Want more ideas? [Ask ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(chatGptQuery)})`,
    ].join('\n');

    const comment: ReviewComment = {
      path: filename,
      line: appendAfterLine ?? block.endLine,
      side: "RIGHT",
      body,
    };

    // Replaced multi-line arrays need a start anchor; appends and inline
    // arrays are single-line.
    if (!appendAfterLine && block.endLine !== block.startLine) {
      comment.start_line = block.startLine;
      comment.start_side = "RIGHT";
    }

    return [comment];
  });
}
