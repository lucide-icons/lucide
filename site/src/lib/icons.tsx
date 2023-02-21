import fs from "fs";
import path from "path";
import { parseSync } from "svgson";
import { IconNode } from "../../../packages/lucide-react/src/createLucideIcon";
import { IconEntity } from "../types";
import { getContributors } from "./fetchAllContributors";

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .filter((fileName) => fs.existsSync(directory + '/' + path.basename(fileName, '.json') + '.svg'))
    .map((fileName) => path.basename(fileName, '.json'));
}

export async function getData(name: string) {
  const svgPath = path.join(directory, `${name}.svg`);
  const svgContent = fs.readFileSync(svgPath, "utf8");
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, "utf8");
  const { tags, categories } = JSON.parse(jsonContent);

  const contributors = await getContributors(name);

  return {
    name,
    tags,
    categories,
    contributors,
    iconNode: parseSync(svgContent).children.map(({name, attributes}) => [name, attributes]) as IconNode,
  };
}

export async function getAllData(): Promise<IconEntity[]> {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
