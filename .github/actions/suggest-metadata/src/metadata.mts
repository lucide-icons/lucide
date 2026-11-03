export const METADATA_FIELDS = ['tags', 'categories', 'use-cases'] as const;
export type MetadataField = (typeof METADATA_FIELDS)[number];
export type Metadata = Record<MetadataField, string[]>;
// The fields that can hold `$extends:` markers.
export const EXTENDABLE_FIELDS = ['tags', 'categories'] as const;
export type ExtendableField = (typeof EXTENDABLE_FIELDS)[number];
// The values of the fields that can hold markers, with the markers expanded.
export type ResolvedMetadata = Record<ExtendableField, string[]>;
export type IconJson = Partial<Metadata> & { deprecated?: boolean };
export type Group = { description: string; tags: string[] };

// Icons reuse metadata through markers: `$extends:<icon>` inherits the tags or
// categories of a base icon, and `$group:<name>` in tags adds the tags of
// `groups/<name>.json`.
export const EXTENDS_PREFIX = '$extends:';
export const GROUP_PREFIX = '$group:';

export const isExtendsMarker = (value: string) => value.startsWith(EXTENDS_PREFIX);
export const isGroupMarker = (value: string) => value.startsWith(GROUP_PREFIX);
export const isMarker = (value: string) => isExtendsMarker(value) || isGroupMarker(value);
export const getMarkerTarget = (marker: string) => marker.slice(marker.indexOf(':') + 1);
// Matches misspelled markers too. A plain `$` is a valid tag (the dollar sign),
// so only a `$` followed by a letter counts.
export const looksLikeMarker = (value: string) => /^\$[a-zA-Z]/.test(value);

export function toMetadata({
  tags = [],
  categories = [],
  'use-cases': useCases = [],
}: IconJson): Metadata {
  return { tags, categories, 'use-cases': useCases };
}
