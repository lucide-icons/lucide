import fs from "fs";
import path from "path";
import { parseSync } from "svgson";
import { IconNode } from "../../../packages/lucide-react/src/createLucideIcon";
import {IconEntity, Release} from "../types";
import { getContributors } from "./fetchAllContributors";
import { generateHashedKey } from "./helpers";
import {filterCommits, getMetadata} from "./fetchAllMetadata";
import {getAllReleases} from "./fetchAllReleases";

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .filter((fileName) => fs.existsSync(directory + '/' + path.basename(fileName, '.json') + '.svg'))
    .map((fileName) => path.basename(fileName, '.json'));
}

export interface GetDataOptions {
  withChildKeys?: boolean
}

export async function getData(name: string, releases: Release[], { withChildKeys = false }: GetDataOptions | undefined = {}) {
  const svgPath = path.join(directory, `${name}.svg`);
  const svgContent = fs.readFileSync(svgPath, "utf8");
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, "utf8");
  const { tags, categories } = JSON.parse(jsonContent);

  const iconNode = parseSync(svgContent).children.map(
    (child) => {
      const { name, attributes } = child

      if (withChildKeys) {
        attributes.key = generateHashedKey(child)
      }

      return [name, attributes]
    }
  ) as IconNode

  const contributors = await getContributors(name);
  const metadata = await getMetadata(name, releases);
  if ('commits' in metadata) {
    delete metadata['commits'];
  }

  return {
    name,
    tags,
    categories,
    contributors,
    iconNode,
    createdRelease: metadata.createdRelease ?? null,
    changedRelease: metadata.changedRelease ?? null,
    created: metadata.created ?? null,
    changed: metadata.changed ?? null,
  };
}

export async function getAllData(options?: GetDataOptions): Promise<IconEntity[]> {
  const names = getAllNames();
  const releases = await getAllReleases();

  return Promise.all(names.map((name) => getData(name, releases, options)));
}
