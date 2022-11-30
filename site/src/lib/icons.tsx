import fs from "fs";
import path from "path";
import {parseSync} from 'svgson';
import tags from '../../../tags.json';
import {IconEntity} from "../types";
import {getAllReleases} from "./fetchAllReleases";
import {getMetadata} from "./fetchAllMetadata"

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}

export async function getData(name: string, releases) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const metadata = await getMetadata(name, releases);
  const tagList = tags[name] || [];

  return {
    name,
    tags: tagList,
    src: fileContent,
    ...metadata
  };
}

export async function getAllData(): Promise<IconEntity[]> {
  const names = getAllNames();
  const releases = await getAllReleases();
  return Promise.all(names.map((name) => getData(name, releases)));
}
