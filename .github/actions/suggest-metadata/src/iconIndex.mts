import { resolveIconExtends } from '../../../../tools/build-helpers/src/resolveMetadataExtends.ts';
import { type IconMetadata } from '../../../../tools/build-icons/types.ts';
import {
  EXTENDABLE_FIELDS,
  EXTENDS_PREFIX,
  getMarkerTarget,
  isExtendsMarker,
  isGroupMarker,
  isMarker,
  type ExtendableField,
  type Group,
  type IconJson,
  type Metadata,
  type MetadataField,
  type ResolvedMetadata,
} from './metadata.mts';

// Resolve the markers of every icon, and answer questions about base icons and
// what markers add. `icons` and `groups` are the checkout with the pull
// request's versions on top.
export function createIconIndex(icons: Record<string, IconJson>, groups: Record<string, Group>) {
  const groupTags = Object.fromEntries(
    Object.entries(groups).map(([name, { tags }]) => [name, tags]),
  );

  // Expand the markers with the resolver the build uses. It updates the map
  // it's given in place, so it gets a copy.
  const resolverIcons = structuredClone(icons) as Record<string, IconMetadata>;
  const resolvedIconNames = new Set<string>();
  function resolveIcon(iconName: string): ResolvedMetadata {
    try {
      const { tags, categories } = resolveIconExtends(
        iconName,
        resolverIcons,
        resolvedIconNames,
        new Set(),
        groupTags,
      );
      return { tags, categories };
    } catch (error) {
      // A marker in the pull request points to a missing icon or group, or
      // makes a cycle. The icon linter reports that, so use the literals.
      console.log(`Could not resolve the markers of ${iconName}: ${(error as Error).message}`);
      const { tags = [], categories = [] } = icons[iconName];
      return {
        tags: tags.filter((value) => !isMarker(value)),
        categories: categories.filter((value) => !isMarker(value)),
      };
    }
  }
  const resolvedIcons = Object.fromEntries(
    Object.keys(icons).map((iconName) => [iconName, resolveIcon(iconName)]),
  );

  // How the other icons use a base: how many are named after it, and how many
  // extend it, in total and per field.
  function getBaseUsage(baseName: string, iconName: string) {
    const marker = `${EXTENDS_PREFIX}${baseName}`;
    const otherIcons = Object.entries(icons).filter(([name]) => name !== iconName);
    const extendingIcons = otherIcons.filter(
      ([, { tags = [], categories = [] }]) => tags.includes(marker) || categories.includes(marker),
    );

    return {
      variants: otherIcons.filter(([name]) => name.startsWith(`${baseName}-`)).length,
      extenders: extendingIcons.length,
      extendedBy: {
        tags: extendingIcons.filter(([, { tags = [] }]) => tags.includes(marker)).length,
        categories: extendingIcons.filter(([, { categories = [] }]) => categories.includes(marker))
          .length,
      },
    };
  }

  // The fields to extend a base in, following how its family does it: the
  // fields at least half of its extenders use, or both for a new base nothing
  // extends yet. A base its existing variants don't extend (`heart` for
  // `heart-arrow`, `square` for `square-*`) gets none.
  function getBaseFields(baseName: string, iconName: string): ExtendableField[] {
    const { variants, extenders, extendedBy } = getBaseUsage(baseName, iconName);
    if (extenders === 0) return variants === 0 ? [...EXTENDABLE_FIELDS] : [];
    return EXTENDABLE_FIELDS.filter((field) => extendedBy[field] * 2 >= extenders);
  }

  // The base icons the model can extend, with the fields to extend each in: the
  // ones the icon already extends, and the existing icons its name builds on
  // (`alarm-clock-minus` → `alarm-clock`, `alarm`) when their family extends
  // them.
  function findBaseIcons(iconName: string, metadata: Metadata) {
    const extendedIcons = new Map<string, ExtendableField[]>();
    for (const field of EXTENDABLE_FIELDS) {
      for (const marker of metadata[field].filter(isExtendsMarker)) {
        const name = getMarkerTarget(marker);
        extendedIcons.set(name, [...(extendedIcons.get(name) ?? []), field]);
      }
    }

    const parts = iconName.split('-');
    const nameBases = parts
      .slice(1)
      .map((_, index) => parts.slice(0, parts.length - 1 - index).join('-'))
      .filter((name) => icons[name] && !icons[name].deprecated && !extendedIcons.has(name))
      .map((name): [string, ExtendableField[]] => [name, getBaseFields(name, iconName)])
      .filter(([, fields]) => fields.length > 0);

    return [...extendedIcons, ...nameBases]
      .filter(([name]) => resolvedIcons[name])
      .map(([name, fields]) => ({ name, fields }));
  }

  // The base icons for the prompt: what each adds, and the fields to extend it
  // in.
  function getBaseIconsContext(iconName: string, metadata: Metadata) {
    return Object.fromEntries(
      findBaseIcons(iconName, metadata).map(({ name, fields }) => [
        `${EXTENDS_PREFIX}${name}`,
        { extendIn: fields, ...resolvedIcons[name] },
      ]),
    );
  }

  function extendsIcon(iconName: string, baseName: string, seen = new Set<string>()): boolean {
    if (iconName === baseName) return true;
    if (seen.has(iconName)) return false;
    seen.add(iconName);

    const { tags = [], categories = [] } = icons[iconName] ?? {};
    return [...tags, ...categories]
      .filter(isExtendsMarker)
      .some((marker) => extendsIcon(getMarkerTarget(marker), baseName, seen));
  }

  // The suggested base icon and the fields to extend it in, if the icon can
  // extend it: an existing icon that isn't the icon itself or deprecated,
  // doesn't extend the icon in turn, and is extended by its family. An icon
  // named after a group is a modifier (`plus` for `file-plus`) unless the name
  // builds on it (`user` for `user-check`): a modifier's tags describe the
  // glyph on its own, and its meaning has a group instead.
  function getSuggestedBase(iconName: string, suggestedBase: string | null) {
    const value = suggestedBase?.trim();
    const baseName = value && isExtendsMarker(value) ? getMarkerTarget(value) : value;

    if (
      !baseName ||
      baseName === iconName ||
      !icons[baseName] ||
      icons[baseName].deprecated ||
      (groups[baseName] && !iconName.startsWith(`${baseName}-`)) ||
      extendsIcon(baseName, iconName)
    ) {
      return null;
    }

    const fields = getBaseFields(baseName, iconName);
    return fields.length > 0 ? { name: baseName, fields } : null;
  }

  // The values a marker adds to a field.
  function getMarkerValues(marker: string, field: MetadataField): string[] {
    if (field === 'use-cases') return [];
    if (isGroupMarker(marker)) return field === 'tags' ? (groups[getMarkerTarget(marker)]?.tags ?? []) : [];
    return resolvedIcons[getMarkerTarget(marker)]?.[field] ?? [];
  }

  return { resolvedIcons, getBaseIconsContext, getSuggestedBase, getMarkerValues };
}

export type IconIndex = ReturnType<typeof createIconIndex>;
