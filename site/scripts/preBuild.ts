import * as dotenv from 'dotenv';
dotenv.config();

import {fetchTags} from "../src/lib/fetchTags";
import {fetchIconNodes} from "../src/lib/fetchIconNodes";
import NextCache from "../src/lib/nextCache";
import {getAllReleases} from "../src/lib/fetchAllReleases";
import {fetchNumberOfContributors} from "../src/lib/fetchAllMetadata";

const clearCache = async () => {
  await NextCache.clear('api-tags', 'api-icon-nodes', 'releases', 'contributors')
}

const buildCache = async () => {
  // Chain these to avoid multiple Github API requests
  await getAllReleases();
  await Promise.all([fetchTags(), fetchIconNodes(), fetchNumberOfContributors()]);
}

const rebuildCache = async () => {
  await Promise.all([clearCache(), buildCache()])
}
rebuildCache().then(() => null)
