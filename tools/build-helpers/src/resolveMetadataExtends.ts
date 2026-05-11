import { type IconMetadata } from '../../build-icons/types.ts';
import { mergeArrays } from './mergeArrays.ts';

type MetadataWithExtends = IconMetadata & {
  '$extends.tags'?: string[];
  '$extends.categories'?: string[];
  '$extends.contributors'?: string[];
};

interface ResolveOptions {
  validateReferences?: boolean;
}

/**
 * Resolves metadata extends for all icons
 * Recursively resolves extends chains and merges inherited properties
 * Removes $extends.* properties from final metadata
 */
export const resolveMetadataExtends = async (
  allMetadata: Record<string, MetadataWithExtends>,
  options: ResolveOptions = {},
): Promise<Record<string, IconMetadata>> => {
  const { validateReferences = true } = options;
  const visited = new Set<string>();
  const resolved: Record<string, IconMetadata> = {};

  // Validate all extends references first if requested
  if (validateReferences) {
    for (const [iconName, metadata] of Object.entries(allMetadata)) {
      validateExtendsReferences(iconName, metadata, allMetadata);
    }
  }

  // Resolve each icon
  for (const iconName of Object.keys(allMetadata)) {
    if (!visited.has(iconName)) {
      resolved[iconName] = resolveIconExtends(iconName, allMetadata, visited, new Set());
    }
  }

  return resolved;
};

/**
 * Resolves extends for a single icon
 * Uses recursion stack to detect circular dependencies
 */
export const resolveIconExtends = (
  iconName: string,
  allMetadata: Record<string, MetadataWithExtends>,
  visited: Set<string>,
  recursionStack: Set<string>,
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

  // Resolve extends
  const inheritedTags: string[] = [];
  const inheritedCategories: string[] = [];
  const inheritedContributors: string[] = [];

  // Resolve tags extends
  if (metadata['$extends.tags']?.length) {
    for (const parentName of metadata['$extends.tags']) {
      validateParentExists(iconName, parentName, allMetadata);
      validateNotSelfReference(iconName, parentName);

      const parent = resolveIconExtends(parentName, allMetadata, visited, recursionStack);
      inheritedTags.push(...parent.tags);
    }
  }

  // Resolve categories extends
  if (metadata['$extends.categories']?.length) {
    for (const parentName of metadata['$extends.categories']) {
      validateParentExists(iconName, parentName, allMetadata);
      validateNotSelfReference(iconName, parentName);

      const parent = resolveIconExtends(parentName, allMetadata, visited, recursionStack);
      inheritedCategories.push(...parent.categories);
    }
  }

  // Resolve contributors extends
  if (metadata['$extends.contributors']?.length) {
    for (const parentName of metadata['$extends.contributors']) {
      validateParentExists(iconName, parentName, allMetadata);
      validateNotSelfReference(iconName, parentName);

      const parent = resolveIconExtends(parentName, allMetadata, visited, recursionStack);
      inheritedContributors.push(...parent.contributors);
    }
  }

  recursionStack.delete(iconName);
  visited.add(iconName);

  // Merge inherited and direct properties
  const resolvedMetadata: IconMetadata = {
    ...metadata,
    tags: mergeArrays(inheritedTags, metadata.tags || []),
    categories: mergeArrays(inheritedCategories, metadata.categories || []),
    contributors: mergeArrays(inheritedContributors, metadata.contributors || []),
  };

  // Remove extends properties from resolved metadata
  delete (resolvedMetadata as any)['$extends.tags'];
  delete (resolvedMetadata as any)['$extends.categories'];
  delete (resolvedMetadata as any)['$extends.contributors'];

  // Update the metadata in place for caching
  Object.assign(allMetadata[iconName], resolvedMetadata);

  return resolvedMetadata;
};

/**
 * Validates that all extends references point to existing icons
 */
export const validateExtendsReferences = (
  iconName: string,
  metadata: MetadataWithExtends,
  allMetadata: Record<string, MetadataWithExtends>,
): void => {
  const allExtends = [
    ...(metadata['$extends.tags'] || []),
    ...(metadata['$extends.categories'] || []),
    ...(metadata['$extends.contributors'] || []),
  ];

  for (const parentName of allExtends) {
    if (!allMetadata[parentName]) {
      throw new Error(
        `Icon '${iconName}' extends non-existent icon '${parentName}'. Available icons: ${Object.keys(allMetadata).join(', ')}`,
      );
    }
  }
};

/**
 * Validates that a parent exists in metadata
 */
function validateParentExists(
  iconName: string,
  parentName: string,
  allMetadata: Record<string, MetadataWithExtends>,
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
