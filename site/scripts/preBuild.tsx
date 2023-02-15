import {fetchTags} from "../src/lib/fetchTags";
import {fetchIconNodes} from "../src/lib/fetchIconNodes";

const buildCache = async () => {
  await Promise.all([fetchTags(), fetchIconNodes()]);
}

buildCache();
