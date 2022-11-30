import fs from "fs";
import path from "path";
import { parseSync } from 'svgson';
import tags from '../../../tags.json';
import { IconEntity } from "../types";
import { getContributors } from "./fetchAllContributors";

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}

export async function getData(name: string) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const contributors = await getContributors(name);

  return {
    name,
    tags: tags[name] || [],
    contributors,
    src: fileContent
  };
}

export async function getAllData(): Promise<IconEntity[]> {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
