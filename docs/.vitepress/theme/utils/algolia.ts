import type { LiteClient } from 'algoliasearch/lite';

export const ALGOLIA_APP_ID = 'R7KKMCPXOB';
export const ALGOLIA_SEARCH_API_KEY = 'dd3101054267d35fb28f49c42715f1aa'; // public key.
/**
 * The index caps retrievable hits at 1000 per query (`paginationLimitedTo`),
 * so a single page of this size is the most we can ever get back.
 */
const HITS_PER_PAGE = 1000;

let clientPromise: Promise<LiteClient> | undefined;

/**
 * Lazily loads the Algolia lite client so it stays out of the initial page bundle.
 * Call it on search input focus to prefetch before the first keystroke.
 */
export function getAlgoliaClient(): Promise<LiteClient> {
  clientPromise ??= import('algoliasearch/lite')
    .then(({ liteClient }) => liteClient(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY))
    .catch((error) => {
      // Allow a retry on the next call instead of caching the failure.
      clientPromise = undefined;
      throw error;
    });

  return clientPromise;
}

export function prefetchAlgoliaClient() {
  getAlgoliaClient().catch(() => {
    // Ignored here, the actual search reports errors.
  });
}

const cache = new Map<string, string[]>();

/**
 * Searches the icon index and returns the matching `objectID`s in relevance order.
 * Core icons use their name as `objectID`, lab icons use `lab/<name>`.
 */
export async function searchIconIds(query: string): Promise<string[]> {
  const cached = cache.get(query);

  if (cached) {
    return cached;
  }

  const client = await getAlgoliaClient();
  const {
    results: [result],
  } = await client.searchForHits<{ objectID: string }>({
    requests: [
      {
        indexName: 'icons',
        query,
        hitsPerPage: HITS_PER_PAGE,
        attributesToRetrieve: ['objectID'],
        attributesToHighlight: [],
      },
    ],
  });

  const ids = result.hits.map((hit) => hit.objectID);
  cache.set(query, ids);

  return ids;
}
