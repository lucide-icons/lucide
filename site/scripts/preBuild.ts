import {fetchTags} from "../src/lib/fetchTags";
import {fetchIconNodes} from "../src/lib/fetchIconNodes";
import NextCache from "../src/lib/nextCache";

const clearCache = async () => {
  await NextCache.clear('api-tags', 'api-icon-nodes')
}

const buildCache = async () => {
  await Promise.all([fetchTags(), fetchIconNodes()])
}

const rebuildCache = async () => {
  await Promise.all([clearCache(), buildCache()])
}

rebuildCache().then(() => null)
