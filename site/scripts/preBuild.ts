import * as dotenv from 'dotenv';
dotenv.config();

import {fetchTags} from "../src/lib/fetchTags";
import {fetchIconNodes} from "../src/lib/fetchIconNodes";
import NextCache from "../src/lib/nextCache";
import {fetchAllReleases, getAllReleases} from "../src/lib/fetchAllReleases";

const clearCache = async () => {
  await NextCache.clear('api-tags', 'api-icon-nodes', 'api-icon-nodes-with-keys')
}

const buildCache = async () => {
  // Chain these to avoid multiple Github API requests
  await getAllReleases();
  await Promise.all([
    fetchTags(),
    fetchIconNodes(true),
    fetchIconNodes(true, {withChildKeys: true}),
    fetchAllReleases(),
  ]);
}

const rebuildCache = async () => {
  await Promise.all([clearCache(), buildCache()])
}
rebuildCache().then(() => null)
