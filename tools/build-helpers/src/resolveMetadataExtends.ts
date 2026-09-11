import { type IconMetadata } from '../../build-icons/types.ts';
import { mergeArrays } from './mergeArrays.ts';

const EXTENDS_PREFIX = '$extends:';
const GROUP_PREFIX = '$group:';

const EXTENDABLE_FIELDS = ['tags', 'categories', 'contributors'] as const;
type ExtendableField = (typeof EXTENDABLE_FIELDS)[number];

/** `$group:` markers describe the meaning of a modifier, which only makes sense for tags. */
const GROUPABLE_FIELDS = ['tags'] as const satisfies readonly ExtendableField[];
type GroupableField = (typeof GROUPABLE_FIELDS)[number];

const isExtendsMarker = (value: string): boolean => value.startsWith(EXTENDS_PREFIX);
const getExtendsTarget = (value: string): string => value.slice(EXTENDS_PREFIX.length);

const isGroupMarker = (value: string): boolean => value.startsWith(GROUP_PREFIX);
const getGroupTarget = (value: string): string => value.slice(GROUP_PREFIX.length);

const isGroupableField = (field: ExtendableField): field is GroupableField =>
  (GROUPABLE_FIELDS as readonly ExtendableField[]).includes(field);

export type TagGroups = Record<string, string[]>;

interface ResolveOptions {
  validateReferences?: boolean;
  tagGroups?: TagGroups;
}

/**
 * Resolves metadata extends for all icons
 * Recursively resolves extends chains and merges inherited properties
 * Inline `$extends:<icon-name>` markers inside the tags/categories/contributors
 * arrays are expanded in place with the referenced icon's resolved values.
 * Inline `$group:<group-name>` markers inside the tags array are expanded in
 * place with the tags of the matching `taxonomy/tag-groups/<group-name>.json`.
 */
export const resolveMetadataExtends = async (
  allMetadata: Record<string, IconMetadata>,
  options: ResolveOptions = {},
): Promise<Record<string, IconMetadata>> => {
  const { validateReferences = true, tagGroups = {} } = options;
  const visited = new Set<string>();
  const resolved: Record<string, IconMetadata> = {};

  // Validate all extends and group references first if requested
  if (validateReferences) {
    for (const [iconName, metadata] of Object.entries(allMetadata)) {
      validateExtendsReferences(iconName, metadata, allMetadata);
      validateGroupReferences(iconName, metadata, tagGroups);
    }
  }

  // Resolve each icon. Icons already resolved as a parent of an earlier icon
  // are returned from the cache by resolveIconExtends, so every icon still ends
  // up in the resulting map.
  for (const iconName of Object.keys(allMetadata)) {
    resolved[iconName] = resolveIconExtends(iconName, allMetadata, visited, new Set(), tagGroups);
  }

  return resolved;
};

/**
 * Resolves extends for a single icon
 * Uses recursion stack to detect circular dependencies
 */
export const resolveIconExtends = (
  iconName: string,
  allMetadata: Record<string, IconMetadata>,
  visited: Set<string>,
  recursionStack: Set<string>,
  tagGroups: TagGroups = {},
): IconMetadata => {
  // Check for circular dependency
  if (recursionStack.has(iconName)) {
    throw new Error(`Circular dependency detected: Icon '${iconName}' extends itself in a cycle`);
  }

  // Return cached result if already resolved
  if (visited.has(iconName)) {
    return allMetadata[iconName] as IconMetadata;
  }

  const metadata = allMetadata[iconName];
  if (!metadata) {
    throw new Error(`Icon '${iconName}' not found`);
  }

  recursionStack.add(iconName);

  // Expand inline `$extends:<icon-name>` and `$group:<group-name>` markers within
  // a single field, keeping literal values in place and de-duplicating the result
  // (first occurrence wins).
  const resolveField = (field: ExtendableField): string[] => {
    const source = (metadata[field] as string[] | undefined) ?? [];
    const expanded: string[] = [];

    for (const entry of source) {
      if (isExtendsMarker(entry)) {
        const parentName = getExtendsTarget(entry);
        validateParentExists(iconName, parentName, allMetadata);
        validateNotSelfReference(iconName, parentName);

        const parent = resolveIconExtends(
          parentName,
          allMetadata,
          visited,
          recursionStack,
          tagGroups,
        );
        expanded.push(...((parent[field] as string[] | undefined) ?? []));
      } else if (isGroupMarker(entry)) {
        validateGroupField(iconName, entry, field);

        const groupName = getGroupTarget(entry);
        validateGroupExists(iconName, groupName, tagGroups);

        expanded.push(...(tagGroups[groupName] as string[]));
      } else {
        expanded.push(entry);
      }
    }

    return mergeArrays(expanded, []);
  };

  const resolvedMetadata = {
    ...metadata,
    tags: resolveField('tags'),
    categories: resolveField('categories'),
    contributors: resolveField('contributors'),
  } as IconMetadata;

  recursionStack.delete(iconName);
  visited.add(iconName);

  // Update the metadata in place for caching
  Object.assign(allMetadata[iconName], resolvedMetadata);

  return resolvedMetadata;
};

/**
 * Validates that all inline extends markers point to existing icons
 */
export const validateExtendsReferences = (
  iconName: string,
  metadata: IconMetadata,
  allMetadata: Record<string, IconMetadata>,
): void => {
  for (const field of EXTENDABLE_FIELDS) {
    for (const entry of (metadata[field] as string[] | undefined) ?? []) {
      if (!isExtendsMarker(entry)) continue;

      const parentName = getExtendsTarget(entry);
      if (!allMetadata[parentName]) {
        throw new Error(
          `Icon '${iconName}' extends non-existent icon '${parentName}'. Available icons: ${Object.keys(allMetadata).join(', ')}`,
        );
      }
    }
  }
};

/**
 * Validates that all inline group markers sit in a field that supports them and
 * point to an existing tag group
 */
export const validateGroupReferences = (
  iconName: string,
  metadata: IconMetadata,
  tagGroups: TagGroups,
): void => {
  for (const field of EXTENDABLE_FIELDS) {
    for (const entry of (metadata[field] as string[] | undefined) ?? []) {
      if (!isGroupMarker(entry)) continue;

      validateGroupField(iconName, entry, field);
      validateGroupExists(iconName, getGroupTarget(entry), tagGroups);
    }
  }
};

/**
 * Validates that a parent exists in metadata
 */
function validateParentExists(
  iconName: string,
  parentName: string,
  allMetadata: Record<string, IconMetadata>,
): void {
  if (!allMetadata[parentName]) {
    throw new Error(`Icon '${iconName}' extends non-existent icon '${parentName}'`);
  }
}

/**
 * Validates that an icon doesn't extend from itself
 */
function validateNotSelfReference(iconName: string, parentName: string): void {
  if (iconName === parentName) {
    throw new Error(`Icon '${iconName}' cannot extend from itself`);
  }
}

/**
 * Validates that a group marker is used in a field that supports tag groups
 */
function validateGroupField(iconName: string, entry: string, field: ExtendableField): void {
  if (!isGroupableField(field)) {
    throw new Error(
      `Icon '${iconName}' uses '${entry}' in '${field}'. Tag groups are only allowed in '${GROUPABLE_FIELDS.join("', '")}'.`,
    );
  }
}

/**
 * Validates that a tag group exists
 */
function validateGroupExists(iconName: string, groupName: string, tagGroups: TagGroups): void {
  if (!tagGroups[groupName]) {
    const available = Object.keys(tagGroups);

    throw new Error(
      `Icon '${iconName}' uses non-existent tag group '${groupName}'. Available tag groups: ${
        available.length > 0 ? available.join(', ') : '(none)'
      }`,
    );
  }
}
