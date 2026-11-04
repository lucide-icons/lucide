import {
  METADATA_FIELDS,
  isMarker,
  toMetadata,
  type IconJson,
  type Metadata,
  type ResolvedMetadata,
} from './metadata.mts';

type ReferenceIcon = { name: string; metadata: Metadata; terms: Set<string> };

// The terms to find similar icons by: the parts of the name, the resolved tags
// and categories, and the markers, which link variants of the same base icon
// or with the same meaning.
export function getTerms(iconName: string, metadata: Metadata, resolved: ResolvedMetadata) {
  return new Set([
    ...iconName.split('-'),
    ...resolved.tags.map((tag) => tag.toLowerCase()),
    ...resolved.categories.map((category) => `category:${category}`),
    ...[...metadata.tags, ...metadata.categories].filter(isMarker),
  ]);
}

export function createReferenceExamples({
  checkoutIcons,
  changedIconNames,
  resolvedIcons,
}: {
  checkoutIcons: Record<string, IconJson>;
  changedIconNames: Set<string>;
  resolvedIcons: Record<string, ResolvedMetadata>;
}) {
  // Only icons of the checkout are used as examples: the ones changed in the
  // pull request haven't been reviewed yet.
  const referenceIcons: ReferenceIcon[] = Object.keys(checkoutIcons)
    .filter((iconName) => !changedIconNames.has(iconName) && !checkoutIcons[iconName].deprecated)
    .map((iconName) => {
      const metadata = toMetadata(checkoutIcons[iconName]);
      return { name: iconName, metadata, terms: getTerms(iconName, metadata, resolvedIcons[iconName]) };
    });

  // Weigh shared terms by how rare they are, so sharing `battery` counts for
  // more than sharing `square` or a broad category.
  const termFrequencies = new Map<string, number>();
  for (const { terms } of referenceIcons) {
    for (const term of terms) termFrequencies.set(term, (termFrequencies.get(term) ?? 0) + 1);
  }
  const getTermWeight = (term: string) =>
    Math.log(referenceIcons.length / (termFrequencies.get(term) ?? referenceIcons.length));

  const hasUseCases = ({ metadata }: ReferenceIcon) => metadata['use-cases'].length > 0;
  const wellPopulatedIcons = referenceIcons.filter(({ metadata }) =>
    METADATA_FIELDS.every((field) => metadata[field].length > 0),
  );

  // Pick the icons most similar to the icon as few-shot examples, so
  // suggestions match how its siblings are described. Most icons don't have
  // use-cases yet, so a few examples that do are always included. When too few
  // icons are similar, well-populated icons spread evenly across the set fill
  // up the rest.
  return function findReferenceExamples(terms: Set<string>, count = 8, useCaseCount = 3) {
    const ranked = referenceIcons
      .map((icon) => ({
        icon,
        score: [...terms].reduce(
          (score, term) => (icon.terms.has(term) ? score + getTermWeight(term) : score),
          0,
        ),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name))
      .map(({ icon }) => icon);

    const step = Math.max(1, Math.floor(wellPopulatedIcons.length / count));
    const spreadIcons = wellPopulatedIcons.filter((_, index) => index % step === 0);

    const examples: ReferenceIcon[] = [];
    const addExamples = (candidates: ReferenceIcon[], isDone: () => boolean) => {
      for (const icon of candidates) {
        if (isDone()) return;
        if (!examples.includes(icon)) examples.push(icon);
      }
    };

    addExamples(ranked, () => examples.length >= count);
    addExamples(
      [...ranked, ...spreadIcons].filter(hasUseCases),
      () => examples.filter(hasUseCases).length >= useCaseCount,
    );
    addExamples(spreadIcons, () => examples.length >= count);

    return examples.map(({ name, metadata }) => ({ name, ...metadata }));
  };
}

export type ReferenceExample = ReturnType<ReturnType<typeof createReferenceExamples>>[number];
