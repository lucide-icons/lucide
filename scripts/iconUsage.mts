import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  describeIconUsage,
  extractContexts,
  summarizeContexts,
  type ContextMatch,
  type IconContextSummary,
  type UsageContext,
  type UsageDescription,
} from './iconUsageContext.mts';

const VERSION = '0.1.0';
const CACHE_DIR = path.resolve(process.cwd(), '.cache/lucide-icon-usage');
const SEARCH_RESULT_CAP = 1000;
const PER_PAGE = 100;
const MIN_SEARCH_DELAY_MS = 6500;
const REQUEST_TIMEOUT_MS = 30000;
const MAX_REQUEST_ATTEMPTS = 6;
const RETRYABLE_STATUSES = [403, 408, 429, 500, 502, 503, 504];
const DEFAULT_MAX_PAGES = 2;
const DEFAULT_MAX_FILES_PER_QUERY = 200;
const THOROUGH_MAX_PAGES = 10;
const THOROUGH_MAX_FILES_PER_QUERY = 1000;
const DEFAULT_MAX_CONTEXTS = 40;
const MAX_CONTEXTS_PER_REPOSITORY = 2;
const DEFAULT_DESCRIBE_MODEL = 'gpt-5-mini';
const ICONS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../icons');

const SUPPORTED_PACKAGES = [
  'lucide-react',
  '@lucide/vue',
  '@lucide/svelte',
  '@lucide/angular',
  '@lucide/astro',
  'lucide-preact',
  'lucide-solid',
  'lucide',
  '@lucide/lab',
] as const;

type SupportedPackage = (typeof SUPPORTED_PACKAGES)[number];

type FileScope = {
  label: string;
  qualifier: string;
  extensions: string[];
};

const PACKAGE_FILE_SCOPES: Record<SupportedPackage, FileScope[]> = {
  'lucide-react': [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  '@lucide/vue': [
    { label: 'vue', qualifier: 'extension:vue', extensions: ['vue'] },
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  '@lucide/svelte': [
    { label: 'svelte', qualifier: 'extension:svelte', extensions: ['svelte'] },
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  '@lucide/angular': [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts'] },
  ],
  '@lucide/astro': [
    { label: 'astro', qualifier: 'extension:astro', extensions: ['astro'] },
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  'lucide-preact': [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  'lucide-solid': [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
  ],
  lucide: [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
    { label: 'html', qualifier: 'extension:html', extensions: ['html'] },
  ],
  '@lucide/lab': [
    { label: 'typescript', qualifier: 'language:typescript', extensions: ['ts', 'tsx'] },
    {
      label: 'javascript',
      qualifier: 'language:javascript',
      extensions: ['js', 'jsx', 'mjs', 'cjs'],
    },
    { label: 'vue', qualifier: 'extension:vue', extensions: ['vue'] },
    { label: 'svelte', qualifier: 'extension:svelte', extensions: ['svelte'] },
    { label: 'astro', qualifier: 'extension:astro', extensions: ['astro'] },
    { label: 'html', qualifier: 'extension:html', extensions: ['html'] },
  ],
};

const DIRECT_ICON_IMPORT_PACKAGES = new Set<SupportedPackage>([
  'lucide-react',
  '@lucide/vue',
  '@lucide/svelte',
  '@lucide/astro',
  'lucide-preact',
  'lucide-solid',
  'lucide',
]);

type CliOptions = {
  icons: string[];
  packages: SupportedPackage[];
  includeForks: boolean;
  includeArchived: boolean;
  includeGenerated: boolean;
  includeVendored: boolean;
  json: boolean;
  csv: boolean;
  refresh: boolean;
  verbose: boolean;
  maxPages: number;
  maxFilesPerQuery: number;
  tokenEnv: string;
  cacheDir: string;
  context: boolean;
  describe: boolean;
  maxContexts: number;
  model: string;
  iconsFiles: string[];
  output: string | null;
};

type SearchItem = {
  name: string;
  path: string;
  url: string;
  html_url: string;
  repository: {
    full_name: string;
    fork?: boolean;
    archived?: boolean;
  };
};

type SearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: SearchItem[];
};

type QueryRecord = {
  icon: string;
  exportName: string;
  packageName: SupportedPackage;
  queryKind: string;
  extension: string;
  query: string;
  totalCount: number;
  fetchedItems: number;
  capped: boolean;
  incompleteResults: boolean;
  pagesFetched: number;
  cacheHits: number;
  localLimitReached: boolean;
  retrievableCapReached: boolean;
};

type RepositoryRecord = {
  icons: string[];
  packages: SupportedPackage[];
  matches: Array<{
    icon: string;
    packageName: SupportedPackage;
    path: string;
    htmlUrl: string;
    evidence: string;
    contexts?: UsageContext[];
  }>;
};

type IconUsage = {
  sampled: boolean;
  summary: IconContextSummary;
  descriptions?: UsageDescription[];
  descriptionError?: string;
};

type AnalysisResult = {
  metadata: {
    version: string;
    analyzedAt: string;
    gitCommit: string | null;
    githubApi: string;
    githubSearchMethod: string;
    resultCaps: string[];
    packages: SupportedPackage[];
    packageFileScopes: Record<SupportedPackage, FileScope[]>;
    includeForks: boolean;
    includeArchived: boolean;
    includeGenerated: boolean;
    includeVendored: boolean;
    maxPages: number;
    maxFilesPerQuery: number;
    cacheDir: string;
    context: boolean;
    maxContexts: number | null;
    describeModel: string | null;
    queries: QueryRecord[];
    warnings: string[];
    biases: string[];
  };
  repositories: Record<string, RepositoryRecord>;
  summary: ReturnType<typeof summarize>;
  usage?: Record<string, IconUsage>;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toPascalCase = (icon: string) =>
  icon
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toCamelCase = (icon: string) => {
  const pascal = toPascalCase(icon);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const exportNameForPackage = (icon: string, packageName: SupportedPackage) =>
  packageName === '@lucide/angular'
    ? `Lucide${toPascalCase(icon)}`
    : packageName === '@lucide/lab' || packageName === 'lucide'
      ? toCamelCase(icon)
      : toPascalCase(icon);

const usageNamesForPackage = (icon: string, packageName: SupportedPackage) => {
  const exportName = exportNameForPackage(icon, packageName);
  if (packageName === '@lucide/angular') {
    return [exportName, `lucide${toPascalCase(icon)}`];
  }
  return [exportName];
};

const parseArgs = (argv: string[]): CliOptions => {
  let explicitPackages = false;
  const options: CliOptions = {
    icons: [],
    packages: ['lucide-react'],
    includeForks: false,
    includeArchived: false,
    includeGenerated: false,
    includeVendored: false,
    json: false,
    csv: false,
    refresh: false,
    verbose: false,
    maxPages: DEFAULT_MAX_PAGES,
    maxFilesPerQuery: DEFAULT_MAX_FILES_PER_QUERY,
    tokenEnv: 'GITHUB_TOKEN',
    cacheDir: CACHE_DIR,
    context: false,
    describe: false,
    maxContexts: DEFAULT_MAX_CONTEXTS,
    model: process.env.OPENAI_MODEL ?? DEFAULT_DESCRIBE_MODEL,
    iconsFiles: [],
    output: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--all-packages') {
      options.packages = [...SUPPORTED_PACKAGES];
      explicitPackages = true;
      continue;
    }
    if (arg === '--package') {
      const packageName = argv[++index] as SupportedPackage | undefined;
      if (!packageName || !SUPPORTED_PACKAGES.includes(packageName)) {
        throw new Error(`Unsupported package: ${packageName ?? '(missing)'}`);
      }
      if (!explicitPackages) options.packages = [];
      explicitPackages = true;
      options.packages = [...options.packages, packageName];
      continue;
    }
    if (arg.startsWith('--package=')) {
      const packageName = arg.slice('--package='.length) as SupportedPackage;
      if (!SUPPORTED_PACKAGES.includes(packageName)) {
        throw new Error(`Unsupported package: ${packageName}`);
      }
      if (!explicitPackages) options.packages = [];
      explicitPackages = true;
      options.packages = [...options.packages, packageName];
      continue;
    }
    if (arg === '--include-forks') {
      options.includeForks = true;
      continue;
    }
    if (arg === '--include-archived') {
      options.includeArchived = true;
      continue;
    }
    if (arg === '--include-generated') {
      options.includeGenerated = true;
      continue;
    }
    if (arg === '--include-vendored') {
      options.includeVendored = true;
      continue;
    }
    if (arg === '--json') {
      options.json = true;
      continue;
    }
    if (arg === '--csv') {
      options.csv = true;
      continue;
    }
    if (arg === '--refresh') {
      options.refresh = true;
      continue;
    }
    if (arg === '--thorough') {
      options.maxPages = THOROUGH_MAX_PAGES;
      options.maxFilesPerQuery = THOROUGH_MAX_FILES_PER_QUERY;
      continue;
    }
    if (arg === '--max-pages') {
      options.maxPages = parsePositiveInteger(argv[++index], '--max-pages');
      continue;
    }
    if (arg.startsWith('--max-pages=')) {
      options.maxPages = parsePositiveInteger(arg.slice('--max-pages='.length), '--max-pages');
      continue;
    }
    if (arg === '--max-files-per-query') {
      options.maxFilesPerQuery = parsePositiveInteger(argv[++index], '--max-files-per-query');
      continue;
    }
    if (arg.startsWith('--max-files-per-query=')) {
      options.maxFilesPerQuery = parsePositiveInteger(
        arg.slice('--max-files-per-query='.length),
        '--max-files-per-query',
      );
      continue;
    }
    if (arg === '--context') {
      options.context = true;
      continue;
    }
    if (arg === '--describe') {
      options.context = true;
      options.describe = true;
      continue;
    }
    if (arg === '--max-contexts') {
      options.maxContexts = parsePositiveInteger(argv[++index], '--max-contexts');
      continue;
    }
    if (arg.startsWith('--max-contexts=')) {
      options.maxContexts = parsePositiveInteger(
        arg.slice('--max-contexts='.length),
        '--max-contexts',
      );
      continue;
    }
    if (arg === '--model') {
      options.model = argv[++index] ?? options.model;
      continue;
    }
    if (arg.startsWith('--model=')) {
      options.model = arg.slice('--model='.length);
      continue;
    }
    if (arg === '--output' || arg === '-o') {
      const file = argv[++index];
      if (!file) throw new Error('--output requires a path.');
      options.output = path.resolve(file);
      options.context = true;
      continue;
    }
    if (arg.startsWith('--output=')) {
      options.output = path.resolve(arg.slice('--output='.length));
      options.context = true;
      continue;
    }
    if (arg === '--icons-file') {
      const file = argv[++index];
      if (!file) throw new Error('--icons-file requires a path.');
      options.iconsFiles.push(path.resolve(file));
      continue;
    }
    if (arg.startsWith('--icons-file=')) {
      options.iconsFiles.push(path.resolve(arg.slice('--icons-file='.length)));
      continue;
    }
    if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
      continue;
    }
    if (arg === '--token-env') {
      options.tokenEnv = argv[++index] ?? options.tokenEnv;
      continue;
    }
    if (arg.startsWith('--token-env=')) {
      options.tokenEnv = arg.slice('--token-env='.length);
      continue;
    }
    if (arg === '--cache-dir') {
      options.cacheDir = path.resolve(argv[++index] ?? options.cacheDir);
      continue;
    }
    if (arg.startsWith('--cache-dir=')) {
      options.cacheDir = path.resolve(arg.slice('--cache-dir='.length));
      continue;
    }
    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`);
    }
    options.icons.push(arg);
  }

  options.icons = [...new Set(options.icons.map((icon) => icon.trim()).filter(Boolean))];
  options.packages = [...new Set(options.packages)];
  if (options.icons.length === 0 && options.iconsFiles.length === 0) {
    throw new Error(
      'Pass at least one Lucide icon name, for example: pnpm icon-usage trash trash-2',
    );
  }
  if (options.describe && !process.env.OPENAI_API_KEY) {
    throw new Error('--describe requires OPENAI_API_KEY to be set.');
  }
  return options;
};

const knownIconNames = async () => {
  try {
    return (await fs.readdir(ICONS_DIR))
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.basename(file, '.json'));
  } catch {
    return [];
  }
};

/**
 * Accepts kebab-case icon names (`trash-2`) as well as export names such as
 * `Trash2`, `Trash2Icon` or `LucideTrash2`, as found in package export lists.
 */
const resolveIconNames = async (inputs: string[]) => {
  const known = await knownIconNames();
  const knownSet = new Set(known);
  const byExportName = new Map(known.map((icon) => [toPascalCase(icon), icon]));
  const unresolved: string[] = [];
  const icons = inputs.map((input) => {
    if (knownSet.has(input) || /^[a-z0-9-]+$/.test(input)) return input;
    const exportName = input.replace(/^Lucide(?=[A-Z])/, '').replace(/Icon$/, '');
    const icon = byExportName.get(exportName) ?? byExportName.get(input);
    if (icon) return icon;
    unresolved.push(input);
    return input
      .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
      .replace(/([0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  });
  if (unresolved.length > 0) {
    status(
      `${unresolved.length} export name(s) not found in icons/, converted to kebab-case: ${unresolved.slice(0, 10).join(', ')}${unresolved.length > 10 ? ', …' : ''}`,
    );
  }
  return [...new Set(icons)];
};

const readIconsFiles = async (files: string[]) =>
  (await Promise.all(files.map((file) => fs.readFile(file, 'utf8')))).flatMap((content) =>
    content
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*$/, '').trim())
      .filter(Boolean),
  );

const parsePositiveInteger = (value: string | undefined, option: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${option} must be a positive integer.`);
  }
  return parsed;
};

const printHelp = () => {
  console.log(`Lucide icon usage estimator

Usage:
  pnpm icon-usage trash trash-2 [options]

Options:
  --package <name>        Search one supported package; repeat for several
  --all-packages          Search all supported packages
  --include-forks         Include repositories GitHub marks as forks
  --include-archived      Include archived repositories
  --include-generated     Include files GitHub marks as generated
  --include-vendored      Include files GitHub marks as vendored
  --json                  Print JSON including repository-to-icon mapping
  --csv                   Print repository CSV
  --refresh               Ignore cached GitHub responses
  --max-pages <n>         Max pages per query slice (default: ${DEFAULT_MAX_PAGES})
  --max-files-per-query <n>
                          Max candidate files to validate per query slice (default: ${DEFAULT_MAX_FILES_PER_QUERY})
  --thorough              Shortcut for --max-pages ${THOROUGH_MAX_PAGES} --max-files-per-query ${THOROUGH_MAX_FILES_PER_QUERY}
  --output, -o <path>     Write usage per icon to a JSON file as { [icon]: [...usage] }:
                          use cases with --describe, otherwise individual usages
                          (implies --context)
  --icons-file <path>     Read icon names (one per line, kebab-case or export names
                          like Trash2) from a file; repeatable
  --context               Extract how each icon is used in context (parent element,
                          labels, handlers, snippet) from the validated files
  --describe              Like --context, then ask an OpenAI model to group the
                          contexts into use-case descriptions (needs OPENAI_API_KEY)
  --max-contexts <n>      Stop searching an icon once n contexts are collected when
                          --context/--describe is set (default: ${DEFAULT_MAX_CONTEXTS})
  --model <name>          Model for --describe (default: $OPENAI_MODEL or ${DEFAULT_DESCRIBE_MODEL})
  --verbose, -v           Print detailed progress logs on stderr
  --token-env <name>      Token environment variable (default: GITHUB_TOKEN)
  --cache-dir <path>      Cache directory (default: .cache/lucide-icon-usage)

Supported packages:
  ${SUPPORTED_PACKAGES.join(', ')}

Default package:
  lucide-react
`);
};

const stableHash = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

const progress = (options: Pick<CliOptions, 'verbose'>, message: string) => {
  if (options.verbose) console.error(`[icon-usage] ${message}`);
};

const status = (message: string) => {
  console.error(`[icon-usage] ${message}`);
};

const readCachedJson = async <T,>(cacheFile: string): Promise<T | null> => {
  try {
    return JSON.parse(await fs.readFile(cacheFile, 'utf8')) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
};

const writeCachedJson = async (cacheFile: string, value: unknown) => {
  await fs.mkdir(path.dirname(cacheFile), { recursive: true });
  await fs.writeFile(cacheFile, `${JSON.stringify(value, null, 2)}\n`);
};

class GitHubClient {
  #token: string;
  #cacheDir: string;
  #refresh: boolean;
  #verbose: boolean;
  #lastSearchAt = 0;

  constructor(token: string, cacheDir: string, refresh: boolean, verbose: boolean) {
    this.#token = token;
    this.#cacheDir = cacheDir;
    this.#refresh = refresh;
    this.#verbose = verbose;
  }

  async searchCode(
    query: string,
    page: number,
  ): Promise<{ response: SearchResponse; cacheHit: boolean }> {
    const url = new URL('https://api.github.com/search/code');
    url.searchParams.set('q', query);
    url.searchParams.set('per_page', String(PER_PAGE));
    url.searchParams.set('page', String(page));
    return this.#cachedFetch<SearchResponse>(url.toString(), 'search', true);
  }

  async getJson<T>(url: string): Promise<{ response: T; cacheHit: boolean }> {
    return this.#cachedFetch<T>(url, 'contents', false);
  }

  async #cachedFetch<T>(
    url: string,
    namespace: string,
    searchEndpoint: boolean,
  ): Promise<{ response: T; cacheHit: boolean }> {
    const cacheFile = path.join(this.#cacheDir, namespace, `${stableHash(url)}.json`);
    if (!this.#refresh) {
      const cached = await readCachedJson<T>(cacheFile);
      if (cached) {
        progress({ verbose: this.#verbose }, `cache hit: ${namespace} ${url}`);
        return { response: cached, cacheHit: true };
      }
    }

    progress({ verbose: this.#verbose }, `fetching: ${namespace} ${url}`);
    const response = await this.#fetchJson<T>(url, searchEndpoint);
    await writeCachedJson(cacheFile, response);
    return { response, cacheHit: false };
  }

  async #fetchJson<T>(url: string, searchEndpoint: boolean): Promise<T> {
    for (let attempt = 0; attempt < MAX_REQUEST_ATTEMPTS; attempt += 1) {
      const canRetry = attempt < MAX_REQUEST_ATTEMPTS - 1;
      if (searchEndpoint) {
        const elapsed = Date.now() - this.#lastSearchAt;
        if (elapsed < MIN_SEARCH_DELAY_MS) await sleep(MIN_SEARCH_DELAY_MS - elapsed);
        this.#lastSearchAt = Date.now();
      }

      let response: Response;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${this.#token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'lucide-icon-usage-script',
          },
        });
      } catch (error) {
        if (canRetry) {
          const waitMs = 2 ** attempt * 3000;
          status(
            `network error on attempt ${attempt + 1}/${MAX_REQUEST_ATTEMPTS}; retrying in ${Math.round(waitMs / 1000)}s: ${
              (error as Error).message
            }`,
          );
          await sleep(waitMs);
          continue;
        }
        throw new Error(
          `GitHub request failed before receiving a response for ${url}: ${(error as Error).message}`,
        );
      } finally {
        clearTimeout(timeout);
      }

      if (response.ok) return response.json() as Promise<T>;

      const retryAfter = Number(response.headers.get('retry-after'));
      const reset = Number(response.headers.get('x-ratelimit-reset'));
      const body = await response.text();
      if (RETRYABLE_STATUSES.includes(response.status) && canRetry) {
        const waitMs =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? retryAfter * 1000
            : [403, 429].includes(response.status) &&
                Number.isFinite(reset) &&
                reset > Date.now() / 1000
              ? reset * 1000 - Date.now() + 1000
              : 2 ** attempt * 3000;
        const boundedWaitMs = Math.min(Math.max(waitMs, 1000), 120000);
        status(
          `GitHub returned ${response.status} on attempt ${attempt + 1}/${MAX_REQUEST_ATTEMPTS}; retrying in ${Math.round(
            boundedWaitMs / 1000,
          )}s`,
        );
        await sleep(boundedWaitMs);
        continue;
      }

      throw new Error(`GitHub request failed (${response.status}) for ${url}: ${body}`);
    }
    throw new Error(`GitHub request failed after retries for ${url}`);
  }
}

const queryFilters = (options: CliOptions) =>
  [
    'in:file',
    options.includeForks ? null : 'NOT is:fork',
    options.includeArchived ? null : 'NOT is:archived',
    options.includeGenerated ? null : 'NOT is:generated',
    options.includeVendored ? null : 'NOT is:vendored',
  ].filter(Boolean) as string[];

const queriesFor = (icon: string, packageName: SupportedPackage, options: CliOptions) => {
  const exportName = exportNameForPackage(icon, packageName);
  const filters = queryFilters(options);
  return PACKAGE_FILE_SCOPES[packageName].flatMap((fileScope) => {
    const importHint = fileScope.extensions.includes('html') ? null : 'import';
    const namedImportQuery = [
      `"${packageName}"`,
      exportName,
      importHint,
      fileScope.qualifier,
      ...filters,
    ]
      .filter(Boolean)
      .join(' ');
    if (!DIRECT_ICON_IMPORT_PACKAGES.has(packageName)) {
      return [{ queryKind: 'named-import', fileScope, query: namedImportQuery }];
    }
    return [
      { queryKind: 'named-import', fileScope, query: namedImportQuery },
      {
        queryKind: 'direct-icon-import',
        fileScope,
        query: [`"${packageName}/icons/${icon}"`, fileScope.qualifier, ...filters].join(' '),
      },
    ];
  });
};

const hasAllowedExtension = (filePath: string, fileScope: FileScope) =>
  fileScope.extensions.some((extension) => filePath.toLowerCase().endsWith(`.${extension}`));

const fetchAllSearchResults = async (
  client: GitHubClient,
  icon: string,
  packageName: SupportedPackage,
  queryKind: string,
  fileScope: FileScope,
  query: string,
  options: CliOptions,
): Promise<{ items: SearchItem[]; record: QueryRecord }> => {
  const items: SearchItem[] = [];
  let totalCount = 0;
  let incompleteResults = false;
  let cacheHits = 0;
  let pagesFetched = 0;

  progress(
    options,
    `search start: icon=${icon} package=${packageName} kind=${queryKind} scope=${fileScope.label}`,
  );
  progress(options, `query: ${query}`);

  for (let page = 1; page <= options.maxPages; page += 1) {
    progress(
      options,
      `search page ${page}/${options.maxPages}: icon=${icon} package=${packageName} kind=${queryKind} scope=${fileScope.label}`,
    );
    const { response, cacheHit } = await client.searchCode(query, page);
    pagesFetched += 1;
    if (cacheHit) cacheHits += 1;
    totalCount = response.total_count;
    incompleteResults = incompleteResults || response.incomplete_results;
    const matchingItems = response.items.filter((item) =>
      hasAllowedExtension(item.path, fileScope),
    );
    items.push(...matchingItems.slice(0, Math.max(options.maxFilesPerQuery - items.length, 0)));
    progress(
      options,
      `page ${page} done: ${response.items.length} items (${matchingItems.length} matching ${fileScope.label}), ${items.length} fetched, total_count=${totalCount.toLocaleString(
        'en-US',
      )}, incomplete=${response.incomplete_results}, cache=${cacheHit ? 'hit' : 'miss'}`,
    );
    if (
      response.items.length < PER_PAGE ||
      items.length >= SEARCH_RESULT_CAP ||
      items.length >= options.maxFilesPerQuery
    )
      break;
  }

  progress(
    options,
    `search done: icon=${icon} package=${packageName} kind=${queryKind} scope=${fileScope.label}; fetched=${items.length}, total_count=${totalCount.toLocaleString(
      'en-US',
    )}${totalCount > SEARCH_RESULT_CAP || items.length >= SEARCH_RESULT_CAP ? ' (GITHUB CAPPED)' : ''}${items.length >= options.maxFilesPerQuery && totalCount > items.length ? ' (LOCAL LIMIT)' : ''}`,
  );

  return {
    items,
    record: {
      icon,
      exportName: exportNameForPackage(icon, packageName),
      packageName,
      queryKind,
      extension: fileScope.label,
      query,
      totalCount,
      fetchedItems: items.length,
      capped: totalCount > SEARCH_RESULT_CAP || items.length >= SEARCH_RESULT_CAP,
      incompleteResults,
      pagesFetched,
      cacheHits,
      localLimitReached: items.length >= options.maxFilesPerQuery && totalCount > items.length,
      retrievableCapReached: totalCount > SEARCH_RESULT_CAP || items.length >= SEARCH_RESULT_CAP,
    },
  };
};

const decodeContent = (payload: { content?: string; encoding?: string }) => {
  if (payload.encoding !== 'base64' || !payload.content) return '';
  return Buffer.from(payload.content.replace(/\n/g, ''), 'base64').toString('utf8');
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const hasNamedImport = (source: string, packageName: SupportedPackage, icon: string) => {
  const names = usageNamesForPackage(icon, packageName).map(escapeRegExp).join('|');
  const importRegex = new RegExp(
    `import\\s+(?:type\\s+)?\\{([\\s\\S]*?)\\}\\s+from\\s+['"]${escapeRegExp(packageName)}['"]`,
    'g',
  );
  for (const match of source.matchAll(importRegex)) {
    const specifiers = match[1] ?? '';
    if (
      new RegExp(
        `(^|,)\\s*(?:type\\s+)?(${names})(?:\\s+as\\s+[A-Za-z_$][\\w$]*)?\\s*(?=,|$)`,
      ).test(specifiers)
    ) {
      return true;
    }
  }
  return false;
};

const hasDirectImport = (source: string, packageName: SupportedPackage, icon: string) => {
  if (packageName === '@lucide/lab') return false;
  return (
    new RegExp(`from\\s+['"]${escapeRegExp(`${packageName}/icons/${icon}`)}['"]`).test(source) ||
    new RegExp(
      `import\\s*\\(\\s*['"]${escapeRegExp(`${packageName}/icons/${icon}`)}['"]\\s*\\)`,
    ).test(source)
  );
};

const hasCommonUsage = (source: string, packageName: SupportedPackage, icon: string) => {
  const names = usageNamesForPackage(icon, packageName).map(escapeRegExp).join('|');
  if (hasNamedImport(source, packageName, icon)) return 'named import';
  if (hasDirectImport(source, packageName, icon)) return 'direct icon import';
  if (packageName === 'lucide' && new RegExp(`\\b(?:icons\\.)?${names}\\b`).test(source))
    return 'lucide export reference';
  if (packageName === '@lucide/angular' && new RegExp(`\\b${names}\\b`).test(source))
    return 'angular icon reference';
  if (packageName === '@lucide/lab' && hasNamedImport(source, packageName, icon))
    return 'lab named import';
  return null;
};

const analyze = async (options: CliOptions): Promise<AnalysisResult> => {
  const token = process.env[options.tokenEnv];
  if (!token) {
    throw new Error(
      `GitHub code search requires authentication. Set ${options.tokenEnv} or pass --token-env <name>.`,
    );
  }

  const client = new GitHubClient(token, options.cacheDir, options.refresh, options.verbose);
  const repositories = new Map<string, RepositoryRecord>();
  const queries: QueryRecord[] = [];
  const seenFiles = new Set<string>();
  const candidateRepositories = new Set<string>();
  const candidatePackageRepositories = new Map<SupportedPackage, Set<string>>(
    options.packages.map((packageName) => [packageName, new Set<string>()]),
  );
  const querySlices = options.icons.reduce(
    (count, icon) =>
      count +
      options.packages.reduce(
        (sum, packageName) => sum + queriesFor(icon, packageName, options).length,
        0,
      ),
    0,
  );
  let completedQuerySlices = 0;
  let contentFilesChecked = 0;
  const contextMatches = new Map<string, ContextMatch[]>(
    options.icons.map((icon) => [icon, [] as ContextMatch[]]),
  );
  const contextLimitReached = (icon: string) =>
    options.context && (contextMatches.get(icon)?.length ?? 0) >= options.maxContexts;
  const sampledIcons = new Set<string>();
  const failedRequests: string[] = [];
  const usage: Record<string, IconUsage> = {};
  const completedIcons: string[] = [];

  status(
    `starting: icons=${options.icons.join(', ')} packages=${options.packages.join(', ')} query-slices=${querySlices} max-pages=${options.maxPages} max-files-per-query=${options.maxFilesPerQuery}`,
  );
  progress(options, `starting analysis for icons: ${options.icons.join(', ')}`);
  progress(options, `packages: ${options.packages.join(', ')}`);
  progress(options, `query slices planned: ${querySlices}`);
  progress(
    options,
    `cache directory: ${options.cacheDir}${options.refresh ? ' (refresh enabled)' : ''}`,
  );

  for (const icon of options.icons) {
    for (const packageName of options.packages) {
      for (const { queryKind, fileScope, query } of queriesFor(icon, packageName, options)) {
        if (contextLimitReached(icon)) {
          sampledIcons.add(icon);
          completedQuerySlices += 1;
          progress(
            options,
            `skipping ${icon} ${packageName} ${fileScope.label} ${queryKind}: --max-contexts reached`,
          );
          continue;
        }
        let searchResult: Awaited<ReturnType<typeof fetchAllSearchResults>>;
        try {
          searchResult = await fetchAllSearchResults(
            client,
            icon,
            packageName,
            queryKind,
            fileScope,
            query,
            options,
          );
        } catch (error) {
          completedQuerySlices += 1;
          failedRequests.push(`search ${icon} ${packageName} ${fileScope.label} ${queryKind}`);
          status(
            `search ${completedQuerySlices}/${querySlices} failed, skipping: ${icon} ${packageName} ${fileScope.label} ${queryKind}: ${(error as Error).message}`,
          );
          continue;
        }
        const { items, record } = searchResult;
        queries.push(record);
        completedQuerySlices += 1;
        status(
          `search ${completedQuerySlices}/${querySlices}: ${icon} ${packageName} ${fileScope.label} ${queryKind}; fetched=${items.length}/${record.totalCount.toLocaleString('en-US')}${record.retrievableCapReached ? ' GitHub-capped' : ''}${record.localLimitReached ? ' local-limit' : ''}`,
        );
        progress(options, `query slice progress: ${completedQuerySlices}/${querySlices}`);

        for (const [itemIndex, item] of items.entries()) {
          if (contextLimitReached(icon)) {
            sampledIcons.add(icon);
            break;
          }
          const repo = item.repository.full_name;
          candidateRepositories.add(repo);
          candidatePackageRepositories.get(packageName)?.add(repo);
          const fileKey = `${item.url}#${icon}#${packageName}`;
          if (seenFiles.has(fileKey)) continue;
          seenFiles.add(fileKey);
          contentFilesChecked += 1;
          if (!options.verbose && contentFilesChecked % 100 === 0) {
            status(
              `validated ${contentFilesChecked} candidate files; matched repositories=${repositories.size}`,
            );
          }
          if (contentFilesChecked === 1 || contentFilesChecked % 25 === 0) {
            progress(
              options,
              `validating file content: checked=${contentFilesChecked}, candidates=${candidateRepositories.size}, matches=${repositories.size}, current=${itemIndex + 1}/${items.length} ${repo}/${item.path}`,
            );
          }

          let contentPayload: { content?: string; encoding?: string };
          try {
            ({ response: contentPayload } = await client.getJson<{
              content?: string;
              encoding?: string;
            }>(item.url));
          } catch (error) {
            failedRequests.push(`contents ${repo}/${item.path}`);
            status(`fetching ${repo}/${item.path} failed, skipping: ${(error as Error).message}`);
            continue;
          }
          const source = decodeContent(contentPayload);
          const evidence = hasCommonUsage(source, packageName, icon);
          if (!evidence) continue;

          const recordForRepo = repositories.get(repo) ?? { icons: [], packages: [], matches: [] };
          if (!recordForRepo.icons.includes(icon)) recordForRepo.icons.push(icon);
          if (!recordForRepo.packages.includes(packageName))
            recordForRepo.packages.push(packageName);
          const contexts = options.context
            ? extractContexts(source, packageName, icon, usageNamesForPackage(icon, packageName))
            : undefined;
          recordForRepo.matches.push({
            icon,
            packageName,
            path: item.path,
            htmlUrl: item.html_url,
            evidence,
            ...(contexts ? { contexts } : {}),
          });
          if (contexts) {
            // Cap contexts per repository so one large project cannot dominate the sample.
            const iconContexts = contextMatches.get(icon) ?? [];
            const fromRepo = iconContexts.filter((match) => match.repository === repo).length;
            for (const context of contexts.slice(
              0,
              Math.max(0, MAX_CONTEXTS_PER_REPOSITORY - fromRepo),
            )) {
              if (iconContexts.length >= options.maxContexts) break;
              iconContexts.push({
                repository: repo,
                path: item.path,
                htmlUrl: item.html_url,
                context,
              });
            }
            contextMatches.set(icon, iconContexts);
            progress(
              options,
              `contexts: ${icon} ${iconContexts.length}/${options.maxContexts} (${contexts.length} in ${repo}/${item.path})`,
            );
          }
          repositories.set(repo, recordForRepo);
          if (!options.verbose) {
            status(`match: ${repo} uses ${icon} via ${packageName} in ${item.path}`);
          }
          progress(
            options,
            `match: ${repo} uses ${icon} via ${packageName} (${evidence}) in ${item.path}; matched repositories=${repositories.size}`,
          );
        }
      }
    }

    // Finish each icon before starting the next so a crash or interruption
    // keeps the results gathered so far in --output.
    if (options.context) {
      usage[icon] = await buildIconUsage(
        options,
        icon,
        contextMatches.get(icon) ?? [],
        sampledIcons.has(icon),
      );
    }
    completedIcons.push(icon);
    if (options.output) {
      await writeOutput(options.output, completedIcons, usage, repositories, options);
    }
  }

  progress(
    options,
    `analysis complete: candidate repositories=${candidateRepositories.size}, validated repositories=${repositories.size}, files checked=${contentFilesChecked}`,
  );
  status(
    `complete: candidate repositories=${candidateRepositories.size}, matched repositories=${repositories.size}, files checked=${contentFilesChecked}`,
  );

  const repositoryObject = Object.fromEntries(
    [...repositories.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([repo, record]) => [
        repo,
        {
          ...record,
          icons: record.icons.sort(),
          packages: record.packages.sort(),
        },
      ]),
  );

  const warnings = buildWarnings(queries);
  if (sampledIcons.size > 0) {
    warnings.push(
      `--max-contexts (${options.maxContexts}) was reached for ${[...sampledIcons].join(', ')}; searching stopped early, so repository counts for those icons are a lower bound.`,
    );
  }
  if (failedRequests.length > 0) {
    warnings.push(
      `${failedRequests.length} request(s) failed after ${MAX_REQUEST_ATTEMPTS} attempts and were skipped, so results are incomplete: ${failedRequests.slice(0, 10).join('; ')}${failedRequests.length > 10 ? '; …' : ''}. Successful responses are cached, so re-running retries only the failed requests.`,
    );
  }
  return {
    metadata: {
      version: VERSION,
      analyzedAt: new Date().toISOString(),
      gitCommit: await gitCommit(),
      githubApi: 'GitHub REST API GET /search/code, API version 2022-11-28',
      githubSearchMethod:
        'Package-scoped code search queries, followed by file-content validation of common Lucide import styles, deduplicated by repository full_name.',
      resultCaps: [
        'GitHub REST code search returns at most 1,000 results per query.',
        'GitHub REST code search is authenticated and rate-limited to 10 requests per minute.',
        'Only default branches and files smaller than 384 KB are searchable.',
        'Search can time out and return incomplete_results=true.',
        'total_count is a search estimate and is not used as the repository count.',
      ],
      packages: options.packages,
      packageFileScopes: Object.fromEntries(
        options.packages.map((packageName) => [packageName, PACKAGE_FILE_SCOPES[packageName]]),
      ) as Record<SupportedPackage, FileScope[]>,
      includeForks: options.includeForks,
      includeArchived: options.includeArchived,
      includeGenerated: options.includeGenerated,
      includeVendored: options.includeVendored,
      maxPages: options.maxPages,
      maxFilesPerQuery: options.maxFilesPerQuery,
      cacheDir: options.cacheDir,
      context: options.context,
      maxContexts: options.context ? options.maxContexts : null,
      describeModel: options.describe ? options.model : null,
      queries,
      warnings,
      biases: [
        'Only public GitHub repositories visible to the authenticated token are observable.',
        'Private repositories and consumers outside GitHub are absent.',
        'GitHub-hosted code is not representative of every Lucide consumer.',
        'Package/framework usage may differ across ecosystems.',
        'GitHub code indexing can be delayed, incomplete, or limited by file size/default branch.',
        'Generated and vendored code may still create false positives when GitHub cannot identify it.',
        'Very common icons can exceed search-result caps; capped queries should be treated as lower-bound or sampled evidence, not complete counts.',
      ],
    },
    repositories: repositoryObject,
    summary: summarize(
      options.icons,
      options.packages,
      repositoryObject,
      candidateRepositories.size,
      candidatePackageRepositories,
    ),
    ...(options.context ? { usage } : {}),
  };
};

const readExistingUseCases = async (icon: string) => {
  try {
    const metadata = JSON.parse(await fs.readFile(path.join(ICONS_DIR, `${icon}.json`), 'utf8'));
    return Array.isArray(metadata['use-cases']) ? (metadata['use-cases'] as string[]) : [];
  } catch {
    return [];
  }
};

const buildIconUsage = async (
  options: CliOptions,
  icon: string,
  matches: ContextMatch[],
  sampled: boolean,
): Promise<IconUsage> => {
  const summary = summarizeContexts(matches);
  const iconUsage: IconUsage = { sampled, summary };
  if (!options.describe || matches.length === 0) return iconUsage;

  status(`describing ${icon} from ${matches.length} contexts with ${options.model}`);
  try {
    iconUsage.descriptions = await describeIconUsage({
      icon,
      matches,
      summary,
      existingUseCases: await readExistingUseCases(icon),
      model: options.model,
      maxPromptContexts: options.maxContexts,
      readCache: (key) =>
        options.refresh
          ? Promise.resolve(null)
          : readCachedJson<UsageDescription[]>(
              path.join(options.cacheDir, 'describe', `${key}.json`),
            ),
      writeCache: (key, value) =>
        writeCachedJson(path.join(options.cacheDir, 'describe', `${key}.json`), value),
    });
  } catch (error) {
    iconUsage.descriptionError = (error as Error).message;
    status(`describing ${icon} failed: ${(error as Error).message}`);
  }
  return iconUsage;
};

const gitCommit = async () => {
  try {
    const { execFile } = await import('node:child_process');
    return await new Promise<string | null>((resolve) => {
      execFile('git', ['rev-parse', 'HEAD'], (error, stdout) =>
        resolve(error ? null : stdout.trim()),
      );
    });
  } catch {
    return null;
  }
};

const buildWarnings = (queries: QueryRecord[]) => {
  const warnings: string[] = [];
  const capped = queries.filter((query) => query.capped);
  const incomplete = queries.filter((query) => query.incompleteResults);
  const locallyLimited = queries.filter((query) => query.localLimitReached);
  const pageLimited = queries.filter(
    (query) =>
      query.pagesFetched >= 1 &&
      query.pagesFetched < THOROUGH_MAX_PAGES &&
      query.totalCount > query.pagesFetched * PER_PAGE,
  );
  if (capped.length > 0) {
    warnings.push(
      `${capped.length} query/queries hit or exceeded GitHub's 1,000-result retrieval cap. Counts are incomplete for those query slices.`,
    );
  }
  if (locallyLimited.length > 0) {
    warnings.push(
      `${locallyLimited.length} query/queries reached --max-files-per-query before all fetched candidates were validated. Increase --max-files-per-query or use --thorough for a broader sample.`,
    );
  }
  if (pageLimited.length > 0) {
    warnings.push(
      `${pageLimited.length} query/queries likely had additional pages beyond --max-pages. Increase --max-pages or use --thorough for a broader sample.`,
    );
  }
  if (incomplete.length > 0) {
    warnings.push(
      `${incomplete.length} query/queries returned incomplete_results=true. GitHub may have timed out before searching all eligible code.`,
    );
  }
  warnings.push(
    'For broad icons, prefer narrowing by package, language/path, or time/repository cohorts and cite the query metadata rather than treating the result as exhaustive.',
  );
  return warnings;
};

const summarize = (
  icons: string[],
  packages: SupportedPackage[],
  repositories: Record<string, RepositoryRecord>,
  repositoriesSearched: number,
  candidatePackageRepositories: Map<SupportedPackage, Set<string>>,
) => {
  const iconTotals = Object.fromEntries(icons.map((icon) => [icon, 0])) as Record<string, number>;
  const exclusive = Object.fromEntries(icons.map((icon) => [icon, 0])) as Record<string, number>;
  const combinations: Record<string, { icons: string[]; count: number; percentage: number }> = {};
  const totalRepositories = Object.keys(repositories).length;

  for (const record of Object.values(repositories)) {
    const matchedIcons = icons.filter((icon) => record.icons.includes(icon));
    for (const icon of matchedIcons) iconTotals[icon] += 1;
    if (matchedIcons.length === 1) exclusive[matchedIcons[0]] += 1;
    const key = matchedIcons.join('+');
    combinations[key] ??= { icons: matchedIcons, count: 0, percentage: 0 };
    combinations[key].count += 1;
  }

  for (const combination of Object.values(combinations)) {
    combination.percentage =
      totalRepositories === 0 ? 0 : (combination.count / totalRepositories) * 100;
  }

  return {
    icons: Object.fromEntries(
      icons.map((icon) => [
        icon,
        {
          uniqueRepositories: iconTotals[icon],
          exclusive: exclusive[icon],
          percentageOfTotal:
            totalRepositories === 0 ? 0 : (iconTotals[icon] / totalRepositories) * 100,
          exclusivePercentageOfTotal:
            totalRepositories === 0 ? 0 : (exclusive[icon] / totalRepositories) * 100,
        },
      ]),
    ),
    combinations,
    packages: Object.fromEntries(
      packages.map((packageName) => [
        packageName,
        summarizePackage(
          icons,
          repositories,
          packageName,
          candidatePackageRepositories.get(packageName)?.size ?? 0,
        ),
      ]),
    ),
    totalRepositories,
    repositoriesSearched,
  };
};

const summarizePackage = (
  icons: string[],
  repositories: Record<string, RepositoryRecord>,
  packageName: SupportedPackage,
  repositoriesSearched: number,
) => {
  const iconTotals = Object.fromEntries(icons.map((icon) => [icon, 0])) as Record<string, number>;
  const exclusive = Object.fromEntries(icons.map((icon) => [icon, 0])) as Record<string, number>;
  const combinations: Record<string, { icons: string[]; count: number; percentage: number }> = {};
  let totalRepositories = 0;

  for (const record of Object.values(repositories)) {
    const packageIcons = icons.filter((icon) =>
      record.matches.some((match) => match.packageName === packageName && match.icon === icon),
    );
    if (packageIcons.length === 0) continue;

    totalRepositories += 1;
    for (const icon of packageIcons) iconTotals[icon] += 1;
    if (packageIcons.length === 1) exclusive[packageIcons[0]] += 1;
    const key = packageIcons.join('+');
    combinations[key] ??= { icons: packageIcons, count: 0, percentage: 0 };
    combinations[key].count += 1;
  }

  for (const combination of Object.values(combinations)) {
    combination.percentage =
      totalRepositories === 0 ? 0 : (combination.count / totalRepositories) * 100;
  }

  return {
    icons: Object.fromEntries(
      icons.map((icon) => [
        icon,
        {
          uniqueRepositories: iconTotals[icon],
          exclusive: exclusive[icon],
          percentageOfTotal:
            totalRepositories === 0 ? 0 : (iconTotals[icon] / totalRepositories) * 100,
          exclusivePercentageOfTotal:
            totalRepositories === 0 ? 0 : (exclusive[icon] / totalRepositories) * 100,
        },
      ]),
    ),
    combinations,
    totalRepositories,
    repositoriesSearched,
  };
};

const formatNumber = (value: number) => value.toLocaleString('en-US');
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const combinationLabel = (icons: string[], totalQueriedIcons: number) =>
  icons.length === 1
    ? `${icons[0]} only`
    : icons.length === 2 && totalQueriedIcons === 2
      ? 'both'
      : icons.join(' + ');

const printHuman = (result: AnalysisResult) => {
  const { summary, metadata } = result;
  console.log('Lucide icon usage on public GitHub repositories');
  for (const [icon, stats] of Object.entries(summary.icons)) {
    console.log(`${icon}`);
    console.log(`  unique repositories: ${formatNumber(stats.uniqueRepositories)}`);
    console.log(
      `  exclusive:           ${formatNumber(stats.exclusive)} (${formatPercent(stats.exclusivePercentageOfTotal)})`,
    );
  }

  console.log('Combinations among repositories using any queried icon:');
  for (const combination of Object.values(summary.combinations).sort((a, b) => b.count - a.count)) {
    const label = combinationLabel(combination.icons, Object.keys(summary.icons).length);
    console.log(
      `  ${label}: ${formatNumber(combination.count)} (${formatPercent(combination.percentage)})`,
    );
  }

  console.log('Per package:');
  for (const [packageName, packageSummary] of Object.entries(summary.packages)) {
    console.log(`${packageName}`);
    for (const [icon, stats] of Object.entries(packageSummary.icons)) {
      console.log(
        `  ${icon}: ${formatNumber(stats.uniqueRepositories)} repositories, ${formatNumber(stats.exclusive)} exclusive (${formatPercent(stats.exclusivePercentageOfTotal)})`,
      );
    }
    const combinations = Object.values(packageSummary.combinations).sort(
      (a, b) => b.count - a.count,
    );
    if (combinations.length > 0) {
      console.log('  combinations:');
      for (const combination of combinations) {
        console.log(
          `  ${combinationLabel(combination.icons, Object.keys(summary.icons).length)}: ${formatNumber(combination.count)} (${formatPercent(combination.percentage)})`,
        );
      }
    }
    console.log(`  total repositories: ${formatNumber(packageSummary.totalRepositories)}`);
    console.log(
      `  repositories sampled/searched: ${formatNumber(packageSummary.repositoriesSearched)}`,
    );
  }

  console.log(`total repositories: ${formatNumber(summary.totalRepositories)}`);
  console.log(`repositories sampled/searched: ${formatNumber(summary.repositoriesSearched)}`);
  console.log(`queries performed: ${formatNumber(metadata.queries.length)}`);

  if (result.usage) printUsage(result.usage);

  const cappedQueries = metadata.queries.filter((query) => query.capped).length;
  const incompleteQueries = metadata.queries.filter((query) => query.incompleteResults).length;
  if (cappedQueries > 0 || incompleteQueries > 0 || metadata.warnings.length > 0) {
    console.log('Warnings:');
    for (const warning of metadata.warnings) console.log(`  ${warning}`);
  }
};

const printUsage = (usage: Record<string, IconUsage>) => {
  const formatTop = (values: Array<{ value: string; count: number }>, limit = 6) =>
    values
      .slice(0, limit)
      .map(({ value, count }) => `${value} (${count})`)
      .join(', ');

  console.log('Usage in context:');
  for (const [icon, { summary, descriptions, descriptionError, sampled }] of Object.entries(
    usage,
  )) {
    console.log(
      `${icon} (${formatNumber(summary.contexts)} contexts from ${formatNumber(summary.repositories)} repositories${sampled ? ', sampled' : ''})`,
    );
    if (summary.contexts === 0) {
      console.log('  no usage contexts found');
      continue;
    }
    if (descriptions && descriptions.length > 0) {
      console.log('  use cases:');
      for (const description of descriptions) {
        console.log(
          `  - ${description.useCase} (~${formatPercent(description.sampleShare * 100)})`,
        );
        console.log(`    ${description.description}`);
        for (const example of description.examples) console.log(`    ${example}`);
      }
    }
    if (descriptionError) console.log(`  description failed: ${descriptionError}`);
    if (summary.topLabels.length > 0) console.log(`  labels:   ${formatTop(summary.topLabels)}`);
    if (summary.topAncestors.length > 0)
      console.log(`  parents:  ${formatTop(summary.topAncestors)}`);
    if (summary.topHosts.length > 0) console.log(`  passed to: ${formatTop(summary.topHosts)}`);
    if (summary.topHandlers.length > 0)
      console.log(`  handlers: ${formatTop(summary.topHandlers)}`);
    console.log('  examples:');
    for (const example of summary.examples.slice(0, 5)) {
      console.log(`  - ${example.description}`);
      console.log(`    ${example.htmlUrl}`);
    }
  }
};

/**
 * Writes `{ [icon]: [...usage] }` for the icons finished so far: the grouped
 * use cases when `--describe` ran, otherwise every individual usage context.
 * Written to a temporary file first so an interruption never leaves it half-written.
 */
const writeOutput = async (
  file: string,
  icons: string[],
  usage: Record<string, IconUsage>,
  repositories: Map<string, RepositoryRecord>,
  options: CliOptions,
) => {
  const output = Object.fromEntries(
    icons.map((icon) => {
      if (options.describe) return [icon, usage[icon]?.descriptions ?? []];
      const usages = [...repositories.entries()].flatMap(([repository, record]) =>
        record.matches
          .filter((match) => match.icon === icon)
          .flatMap((match) =>
            (match.contexts ?? []).map((context) => ({
              description: context.description,
              repository,
              url: `${match.htmlUrl}#L${context.line}`,
              kind: context.kind,
              parents: context.ancestors,
              component: context.component,
              labels: [...context.labels, ...context.i18nKeys],
              handlers: context.handlers,
              links: context.links,
            })),
          ),
      );
      return [icon, usages];
    }),
  );
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(output, null, 2)}\n`);
  await fs.rename(temporaryFile, file);
  status(`wrote usage for ${icons.length}/${options.icons.length} icon(s) to ${file}`);
};

const printCsv = (result: AnalysisResult) => {
  const rows = [['repository', 'icons', 'packages', 'matches', 'contexts']];
  for (const [repo, record] of Object.entries(result.repositories)) {
    rows.push([
      repo,
      record.icons.join('|'),
      record.packages.join('|'),
      record.matches.map((match) => `${match.icon}:${match.packageName}:${match.path}`).join('|'),
      record.matches
        .flatMap((match) =>
          (match.contexts ?? []).map((context) => `${match.icon}: ${context.description}`),
        )
        .join('|'),
    ]);
  }
  console.log(
    rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n'),
  );
};

try {
  const options = parseArgs(process.argv.slice(2));
  options.icons = await resolveIconNames([
    ...options.icons,
    ...(await readIconsFiles(options.iconsFiles)),
  ]);
  const result = await analyze(options);
  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (options.csv) {
    printCsv(result);
  } else {
    printHuman(result);
  }
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
