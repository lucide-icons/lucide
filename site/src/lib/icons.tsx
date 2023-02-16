import fs from "fs";
import path from "path";
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
  const iconJson = JSON.parse(jsonContent);

  const contributors = await getContributors(name);

  return {
    ...iconJson,
    name,
    contributors,
    src: svgContent
  };
}

export async function getAllData(): Promise<IconEntity[]> {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
