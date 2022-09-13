import fs from "fs";
import path from "path";
import { parseSync, stringify } from 'svgson';
import tags from '../../../tags.json';
import { Contributor, getContributors } from "./fetchAllContributors";

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

  const svgNodes = parseSync(fileContent);

  const svgContent = svgNodes.children.map((node) => stringify(node)).join('');

  const contributors = await getContributors(name);

  return {
    name,
    tags: tags[name] || [],
    contributors,
    src: fileContent,
    content: svgContent
  };
}

export interface IconData {
  name: string
  tags: string[]
  contributors: Contributor[]
  src: string
  content: string
}

export async function getAllData(): Promise<IconData[]> {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
