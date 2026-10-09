// Extracts how an icon is used inside a source file (surrounding element,
// label text, handlers, config objects) and aggregates those usages into
// per-icon descriptions. Used by `iconUsage.mts` with `--context`/`--describe`.

export type UsageContext = {
  line: number;
  kind: 'element' | 'prop' | 'object' | 'reference' | 'data-attribute';
  localName: string;
  hostTag: string | null;
  ancestors: string[];
  component: string | null;
  labels: string[];
  i18nKeys: string[];
  handlers: string[];
  links: string[];
  iconProps: string | null;
  snippet: string;
  description: string;
};

export type ContextMatch = {
  repository: string;
  path: string;
  htmlUrl: string;
  context: UsageContext;
};

export type IconContextSummary = {
  contexts: number;
  repositories: number;
  topLabels: Array<{ value: string; count: number }>;
  topHosts: Array<{ value: string; count: number }>;
  topAncestors: Array<{ value: string; count: number }>;
  topHandlers: Array<{ value: string; count: number }>;
  kinds: Record<string, number>;
  examples: Array<{ repository: string; htmlUrl: string; description: string }>;
};

const MAX_CONTEXTS_PER_FILE = 3;
const SNIPPET_LINES_BEFORE = 3;
const SNIPPET_LINES_AFTER = 3;
const LOOKBEHIND_CHARS = 2500;
const MAX_SNIPPET_LINE_LENGTH = 160;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const unique = <T,>(values: T[]) => [...new Set(values)];

const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

/**
 * Resolves the identifiers a file uses for an icon, following `as` aliases
 * and default imports of direct icon paths (e.g. `lucide-react/icons/trash`).
 */
export const localNamesFor = (
  source: string,
  packageName: string,
  icon: string,
  usageNames: string[],
) => {
  const names = new Set<string>();
  const escapedPackage = escapeRegExp(packageName);
  const namedImportRegex = new RegExp(
    `import\\s+(?:type\\s+)?\\{([\\s\\S]*?)\\}\\s+from\\s+['"]${escapedPackage}['"]`,
    'g',
  );
  for (const match of source.matchAll(namedImportRegex)) {
    for (const specifier of (match[1] ?? '').split(',')) {
      const parts = specifier
        .trim()
        .replace(/^type\s+/, '')
        .split(/\s+as\s+/);
      if (!usageNames.includes(parts[0]?.trim() ?? '')) continue;
      names.add((parts[1] ?? parts[0]).trim());
    }
  }

  const directImportRegex = new RegExp(
    `import\\s+([A-Za-z_$][\\w$]*)\\s+from\\s+['"]${escapeRegExp(`${packageName}/icons/${icon}`)}(?:\\.js)?['"]`,
    'g',
  );
  for (const match of source.matchAll(directImportRegex)) names.add(match[1]);

  // Packages without imports in the template (vanilla `lucide`, Angular) are
  // referenced by their export names directly.
  if (names.size === 0) usageNames.forEach((name) => names.add(name));
  return [...names];
};

/** Character ranges that are import/export statements and must not count as usage. */
const statementRanges = (source: string) => {
  const ranges: Array<[number, number]> = [];
  const regex =
    /(?:^|\n)\s*(?:import|export)\s+(?:type\s+)?(?:[\w$*\s,]*\{[\s\S]*?\}|[\w$*\s,]+?)\s*from\s*['"][^'"]+['"]/g;
  for (const match of source.matchAll(regex)) {
    ranges.push([match.index ?? 0, (match.index ?? 0) + match[0].length]);
  }
  return ranges;
};

type Tag = { name: string; start: number; end: number; attributes: string };

/**
 * Finds the end of a JSX/HTML tag that starts at `start`, skipping over `{}`
 * expressions, strings and arrow functions so `onClick={() => a > b}` does not
 * end the tag early.
 */
const findTagEnd = (source: string, start: number, limit: number) => {
  let depth = 0;
  let quote: string | null = null;
  for (let index = start + 1; index < limit; index += 1) {
    const char = source[index];
    if (quote) {
      if (char === quote && source[index - 1] !== '\\') quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') quote = char;
    else if (char === '{') depth += 1;
    else if (char === '}') depth = Math.max(0, depth - 1);
    else if (char === '>' && depth === 0 && source[index - 1] !== '=') return index;
    else if (
      char === '<' &&
      depth === 0 &&
      index > start + 1 &&
      /[A-Za-z/]/.test(source[index + 1] ?? '')
    )
      return -1;
  }
  return -1;
};

const VOID_ELEMENTS = new Set([
  'img',
  'input',
  'br',
  'hr',
  'meta',
  'link',
  'source',
  'area',
  'col',
  'embed',
  'wbr',
]);

/**
 * Scans markup before `position` and returns the still-open elements
 * (innermost last) plus the tag `position` sits inside, if any.
 */
const openElementsAt = (source: string, position: number) => {
  const windowStart = Math.max(0, position - LOOKBEHIND_CHARS);
  const stack: Tag[] = [];
  let host: Tag | null = null;
  const tagRegex = /<(\/?)([A-Za-z][\w.:-]*)/g;
  tagRegex.lastIndex = windowStart;
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(source)) && match.index < position) {
    const [, closing, name] = match;
    // `a < b` or generics like `Array<string>` are not markup.
    const before = source[match.index - 1] ?? '';
    if (!closing && /[\w$)\]]/.test(before)) continue;
    const end = findTagEnd(source, match.index, Math.min(source.length, position + 2000));
    if (end === -1) continue;
    const tag = { name, start: match.index, end, attributes: source.slice(match.index, end + 1) };
    if (end >= position) {
      if (!closing) host = tag;
      break;
    }
    if (closing) {
      const openIndex = stack.map((item) => item.name).lastIndexOf(name);
      if (openIndex !== -1) stack.splice(openIndex);
    } else if (source[end - 1] !== '/' && !VOID_ELEMENTS.has(name.toLowerCase())) {
      stack.push(tag);
    }
    tagRegex.lastIndex = end + 1;
  }
  return { stack, host };
};

const LABEL_ATTRIBUTES = [
  'aria-label',
  'title',
  'label',
  'tooltip',
  'alt',
  'placeholder',
  'content',
  'text',
  'name',
];

const attributeValues = (markup: string, names: string[]) => {
  const values: string[] = [];
  const pattern = names.map(escapeRegExp).join('|');
  const regex = new RegExp(
    `(?:^|[\\s{,])(?:${pattern})\\s*[=:]\\s*(?:\\{\\s*)?(?:"([^"]{1,80})"|'([^']{1,80})'|\`([^\`$]{1,80})\`)`,
    'g',
  );
  for (const match of markup.matchAll(regex)) {
    const value = clean(match[1] ?? match[2] ?? match[3] ?? '');
    if (value) values.push(value);
  }
  return values;
};

const handlerValues = (markup: string) => {
  const values: string[] = [];
  const regex =
    /(?:^|[\s(])(on[A-Z]\w*|@[\w.-]+|v-on:[\w.-]+|\(click\)|on:\w+|onclick)\s*=\s*\{?\s*["']?(?:\(\)\s*=>\s*)?([\w$.]+)/g;
  for (const match of markup.matchAll(regex)) {
    if (match[2] && !['function', 'async', 'e', 'event'].includes(match[2])) {
      values.push(`${match[1]}=${match[2]}`);
    }
  }
  return values;
};

const linkValues = (markup: string) =>
  attributeValues(markup, ['href', 'to', 'url', 'path', 'route', 'routerLink']);

const i18nKeys = (markup: string) => {
  const keys: string[] = [];
  const regex =
    /\b(?:t|i18n\.t|\$t|translate|formatMessage|intl\.formatMessage)\(\s*(?:\{\s*id:\s*)?['"`]([\w.:-]{2,80})['"`]/g;
  for (const match of markup.matchAll(regex)) keys.push(match[1]);
  return keys;
};

/** Content range of an element (between its open and close tags), bounded in size. */
const elementContent = (source: string, parent: Tag | undefined, fallbackStart: number) => {
  const start = parent ? parent.end + 1 : fallbackStart;
  const closing = parent ? source.indexOf(`</${parent.name}`, start) : -1;
  const end =
    closing === -1 ? Math.min(source.length, start + 300) : Math.min(closing, start + 600);
  return source.slice(start, end);
};

/** Visible text inside an element, with nested tags and expressions removed. */
const elementText = (source: string, parent: Tag | undefined, fallbackStart: number) => {
  const content = elementContent(source, parent, fallbackStart);
  const text = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/[{}]/g, ' ');
  const value = clean(text);
  if (!value || value.length > 80 || /[;=]|=>|\breturn\b/.test(value)) return [];
  return [value];
};

const enclosingComponent = (source: string, position: number) => {
  const before = source.slice(Math.max(0, position - 20000), position);
  const regex =
    /(?:function\s+([A-Z][\w$]*)|(?:const|let|var)\s+([A-Z][\w$]*)\s*(?::[^=]+)?=\s*(?:\([^)]*\)|[\w$]+)?\s*(?:=>|function)|class\s+([A-Z][\w$]*))/g;
  let name: string | null = null;
  for (const match of before.matchAll(regex)) name = match[1] ?? match[2] ?? match[3] ?? name;
  return name;
};

const snippetAround = (lines: string[], lineIndex: number) =>
  lines
    .slice(Math.max(0, lineIndex - SNIPPET_LINES_BEFORE), lineIndex + SNIPPET_LINES_AFTER + 1)
    .map((line) =>
      line.length > MAX_SNIPPET_LINE_LENGTH ? `${line.slice(0, MAX_SNIPPET_LINE_LENGTH)}…` : line,
    )
    .join('\n');

/** Object literal around a reference such as `{ title: 'Settings', icon: Settings }`. */
const objectLiteralAround = (source: string, position: number) => {
  let depth = 0;
  let start = -1;
  for (let index = position; index >= Math.max(0, position - 600); index -= 1) {
    const char = source[index];
    if (char === '}') depth += 1;
    else if (char === '{') {
      if (depth === 0) {
        start = index;
        break;
      }
      depth -= 1;
    }
  }
  if (start === -1) return null;
  depth = 0;
  for (let index = start; index < Math.min(source.length, start + 1200); index += 1) {
    const char = source[index];
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  return null;
};

const describe = (context: Omit<UsageContext, 'description' | 'snippet'>) => {
  const parent = context.ancestors.at(-1);
  const where =
    context.kind === 'object'
      ? 'config object'
      : context.kind === 'prop'
        ? `\`${context.hostTag}\` prop`
        : parent
          ? `<${parent}>`
          : context.kind === 'data-attribute'
            ? `<${context.hostTag ?? 'i'} data-lucide>`
            : 'standalone element';
  const parts = [`${context.localName} in ${where}`];
  const label = context.labels[0] ?? context.i18nKeys[0];
  if (label) parts.push(`labelled "${label}"`);
  if (context.handlers.length > 0)
    parts.push(`handling ${context.handlers.slice(0, 2).join(', ')}`);
  if (context.links.length > 0) parts.push(`linking to ${context.links[0]}`);
  if (context.iconProps && /spin|animate|loading/i.test(context.iconProps))
    parts.push('(animated)');
  if (context.component) parts.push(`within ${context.component}`);
  return parts.join(' ');
};

/** Extracts up to a few usage contexts of an icon from a single source file. */
export const extractContexts = (
  source: string,
  packageName: string,
  icon: string,
  usageNames: string[],
): UsageContext[] => {
  const localNames = localNamesFor(source, packageName, icon, usageNames);
  const ranges = statementRanges(source);
  const lines = source.split('\n');
  const lineStarts: number[] = [];
  lines.reduce((offset, line) => {
    lineStarts.push(offset);
    return offset + line.length + 1;
  }, 0);
  const lineAt = (position: number) => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (lineStarts[mid] <= position) low = mid;
      else high = mid - 1;
    }
    return low;
  };

  const namePattern = unique([
    ...localNames.map(escapeRegExp),
    // Vue templates may use kebab-case component names.
    ...(packageName === '@lucide/vue'
      ? localNames.map((name) => escapeRegExp(toKebabCase(name)))
      : []),
  ]).join('|');
  const occurrences: Array<{ position: number; name: string; dataAttribute: boolean }> = [];
  for (const match of source.matchAll(
    new RegExp(`(?<![\\w$.'"/-])(${namePattern})(?![\\w$-])`, 'g'),
  )) {
    occurrences.push({ position: match.index ?? 0, name: match[1], dataAttribute: false });
  }
  if (packageName === 'lucide') {
    for (const match of source.matchAll(
      new RegExp(`data-lucide\\s*=\\s*["']${escapeRegExp(icon)}["']`, 'g'),
    )) {
      occurrences.push({ position: match.index ?? 0, name: icon, dataAttribute: true });
    }
  }

  const contexts: UsageContext[] = [];
  const seenLines = new Set<number>();
  for (const { position, name, dataAttribute } of occurrences.sort(
    (a, b) => a.position - b.position,
  )) {
    if (contexts.length >= MAX_CONTEXTS_PER_FILE) break;
    if (ranges.some(([start, end]) => position >= start && position < end)) continue;
    const lineIndex = lineAt(position);
    if (seenLines.has(lineIndex)) continue;
    const lineText = lines[lineIndex];
    if (/^\s*(\/\/|\*|\/\*)/.test(lineText)) continue;
    // Registration calls such as `createIcons({ icons: { Trash } })` carry no context.
    if (
      /(?:createIcons\s*\(|LucideAngularModule\.pick\s*\(|addIcons\s*\(|icons\s*:\s*\{)[^}<]*$/.test(
        source.slice(Math.max(0, position - 300), position),
      )
    )
      continue;

    const isElement = source[position - 1] === '<';
    const { stack, host } = isElement
      ? openElementsAt(source, position - 1)
      : openElementsAt(source, position);
    const ownTag = isElement
      ? (() => {
          const end = findTagEnd(source, position - 1, Math.min(source.length, position + 2000));
          return end === -1 ? null : source.slice(position - 1, end + 1);
        })()
      : null;

    let kind: UsageContext['kind'] = 'reference';
    let hostTag: string | null = null;
    let markupForSignals = '';
    if (dataAttribute) {
      kind = 'data-attribute';
      hostTag = host?.name ?? null;
    } else if (isElement) {
      kind = 'element';
    } else if (host) {
      kind = 'prop';
      hostTag = host.name;
      markupForSignals = host.attributes;
    } else {
      const object = objectLiteralAround(source, position);
      if (object && new RegExp(`[\\w$]+\\s*:\\s*${escapeRegExp(name)}\\b`).test(object)) {
        kind = 'object';
        markupForSignals = object;
      }
    }

    const ancestors = stack.slice(-3).map((tag) => tag.name);
    const parent = stack.at(-1);
    const ancestorMarkup = stack
      .slice(-2)
      .map((tag) => tag.attributes)
      .join(' ');
    const signalMarkup = [markupForSignals, ancestorMarkup].join(' ');
    const labels = unique([
      ...(kind === 'object' ? attributeValues(markupForSignals, LABEL_ATTRIBUTES) : []),
      ...attributeValues(
        signalMarkup,
        LABEL_ATTRIBUTES.filter((attr) => attr !== 'name'),
      ),
      ...(kind === 'element' || kind === 'data-attribute' || kind === 'prop'
        ? elementText(source, kind === 'prop' && host ? host : parent, position)
        : []),
    ]).slice(0, 4);

    const base = {
      line: lineIndex + 1,
      kind,
      localName: name,
      hostTag,
      ancestors,
      component: enclosingComponent(source, position),
      labels,
      i18nKeys: unique(
        i18nKeys(
          kind === 'object'
            ? markupForSignals
            : `${signalMarkup} ${elementContent(source, kind === 'prop' && host ? host : parent, position)}`,
        ),
      ).slice(0, 3),
      handlers: unique(handlerValues(signalMarkup)).slice(0, 3),
      links: unique(linkValues(signalMarkup)).slice(0, 2),
      iconProps: ownTag
        ? clean(ownTag.slice(name.length + 1, -1).replace(/\/$/, '')).slice(0, 120) || null
        : null,
    };
    seenLines.add(lineIndex);
    contexts.push({
      ...base,
      snippet: snippetAround(lines, lineIndex),
      description: describe(base),
    });
  }
  return contexts;
};

const topValues = (values: string[], limit = 8) => {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
};

/** Aggregates the contexts collected for one icon into frequency tables. */
export const summarizeContexts = (matches: ContextMatch[]): IconContextSummary => {
  const contexts = matches.map((match) => match.context);
  const kinds: Record<string, number> = {};
  for (const context of contexts) kinds[context.kind] = (kinds[context.kind] ?? 0) + 1;
  // Prefer one example per repository so a single project cannot dominate.
  const examples: IconContextSummary['examples'] = [];
  const exampleRepos = new Set<string>();
  for (const match of matches) {
    if (exampleRepos.has(match.repository)) continue;
    exampleRepos.add(match.repository);
    examples.push({
      repository: match.repository,
      htmlUrl: `${match.htmlUrl}#L${match.context.line}`,
      description: match.context.description,
    });
    if (examples.length >= 10) break;
  }
  return {
    contexts: contexts.length,
    repositories: new Set(matches.map((match) => match.repository)).size,
    topLabels: topValues(
      contexts.flatMap((context) =>
        unique([...context.labels, ...context.i18nKeys].map((value) => value.toLowerCase())),
      ),
    ),
    topHosts: topValues(contexts.flatMap((context) => (context.hostTag ? [context.hostTag] : []))),
    topAncestors: topValues(contexts.flatMap((context) => context.ancestors.slice(-1))),
    topHandlers: topValues(
      contexts.flatMap((context) => context.handlers.map((handler) => handler.split('=')[0])),
    ),
    kinds,
    examples,
  };
};

export type UsageDescription = {
  useCase: string[];
  description: string;
  sampleShare: number;
  examples: string[];
};

type DescribeOptions = {
  icon: string;
  matches: ContextMatch[];
  summary: IconContextSummary;
  existingUseCases: string[];
  model: string;
  maxPromptContexts: number;
  readCache: (key: string) => Promise<UsageDescription[] | null>;
  writeCache: (key: string, value: UsageDescription[]) => Promise<void>;
};

const METADATA_INSTRUCTIONS = new URL(
  '../.github/instructions/metadata.instructions.md',
  import.meta.url,
);

const FALLBACK_USE_CASE_GUIDELINES = `Write each use-case as a short phrase of roughly 4-12 words starting with a present participle verb (e.g. "Indicating a low battery charge level"), from the interface's perspective, naming the concrete context where useful. No trailing period, no first person, no marketing language, and never just the icon's name.`;

/**
 * Returns the "Use Cases" section of the repository's metadata instructions
 * (including its examples), so generated use-cases follow the same style.
 */
const loadUseCaseGuidelines = async () => {
  try {
    const fs = await import('node:fs/promises');
    const instructions = await fs.readFile(METADATA_INSTRUCTIONS, 'utf8');
    const start = instructions.indexOf('## Use Cases');
    if (start === -1) return FALLBACK_USE_CASE_GUIDELINES;
    const sections = instructions.slice(start).split(/\n(?=## )/);
    return sections
      .filter((section, index) => index === 0 || section.startsWith('## Examples'))
      .join('\n')
      .trim();
  } catch {
    return FALLBACK_USE_CASE_GUIDELINES;
  }
};

/**
 * Asks an OpenAI model to cluster the collected usage contexts into distinct,
 * real-world use cases for the icon. Responses are cached by prompt hash.
 */
export const describeIconUsage = async ({
  icon,
  matches,
  summary,
  existingUseCases,
  model,
  maxPromptContexts,
  readCache,
  writeCache,
}: DescribeOptions): Promise<UsageDescription[]> => {
  if (matches.length === 0) return [];
  const samples = matches.slice(0, maxPromptContexts).map((match, index) => ({
    id: index + 1,
    repository: match.repository,
    path: match.path,
    component: match.context.component,
    parents: match.context.ancestors,
    labels: [...match.context.labels, ...match.context.i18nKeys],
    handlers: match.context.handlers,
    links: match.context.links,
    snippet: match.context.snippet,
  }));

  const input = `You are maintaining the metadata for the Lucide icon library. Below are real usages of the \`${icon}\` icon found in public GitHub repositories, extracted from source code.

Group these usages by what the icon means in them, and describe each group.

Fields for each group:
- useCase: an array of 1-3 use-case phrases for this group, written exactly as the use-case guidelines below describe. Add more than one phrase only when the group covers genuinely distinct uses; never rephrase the same idea. Don't repeat a phrase across groups.
- description: one or two sentences describing how and where the icon appears in the UI (e.g. inside a ghost button in a table row, next to a "Delete" label).
- sampleShare: the approximate fraction (0-1) of the samples that belong to this group.
- examples: ids of up to 3 samples that best illustrate the group.

Rules:
- Return between 1 and 4 groups, most common first. Ignore samples without enough context to judge.
- The samples are your source material: extract the function the icon serves in the interface and discard implementation details such as component names, class names or file paths.
- Base everything on the samples; never invent use cases that are not supported by them.
- Match the style of the existing use-cases, and avoid duplicating them.

Use-case guidelines (from .github/instructions/metadata.instructions.md):
<guidelines>
${await loadUseCaseGuidelines()}
</guidelines>

Existing use-cases for "${icon}": ${JSON.stringify(existingUseCases)}

Aggregated signals:
${JSON.stringify({ topLabels: summary.topLabels, topParents: summary.topAncestors, topHandlers: summary.topHandlers, kinds: summary.kinds })}

Samples:
${JSON.stringify(samples, null, 1)}`;

  const crypto = await import('node:crypto');
  const cacheKey = crypto.createHash('sha256').update(`${model}\n${input}`).digest('hex');
  const cached = await readCache(cacheKey);
  if (cached) return cached;

  const [{ default: OpenAI }, { zodTextFormat }, { default: z }] = await Promise.all([
    import('openai'),
    import('openai/helpers/zod'),
    import('zod'),
  ]);
  const schema = z.object({
    useCases: z.array(
      z.object({
        useCase: z.array(z.string()),
        description: z.string(),
        sampleShare: z.number(),
        examples: z.array(z.number()),
      }),
    ),
  });

  // The SDK retries timeouts (408), rate limits and server errors with backoff.
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, maxRetries: 5 });
  const response = await client.responses.create({
    model,
    input,
    text: { format: zodTextFormat(schema, 'usage') },
  });
  const parsed = schema.parse(JSON.parse(response.output_text));
  const descriptions = parsed.useCases.map((useCase) => ({
    useCase: useCase.useCase,
    description: useCase.description,
    sampleShare: useCase.sampleShare,
    examples: useCase.examples
      .map((id) => matches[id - 1])
      .filter(Boolean)
      .map((match) => `${match.htmlUrl}#L${match.context.line}`),
  }));
  await writeCache(cacheKey, descriptions);
  return descriptions;
};
