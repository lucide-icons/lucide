import fs from "fs";
import path from "path";
import {IconEntity} from "../types";
import {getAllReleases} from "./fetchAllReleases";
import {getMetadata} from "./fetchAllMetadata"

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .filter((fileName) => fs.existsSync(directory + '/' + path.basename(fileName, '.json') + '.svg'))
    .map((fileName) => path.basename(fileName, '.json'));
}

export async function getData(name: string, releases) {
  const svgPath = path.join(directory, `${name}.svg`);
  const svgContent = fs.readFileSync(svgPath, "utf8");
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, "utf8");
  const iconJson = JSON.parse(jsonContent);

  const metadata = await getMetadata(name, releases);

  return {
    ...iconJson,
    name,
    src: svgContent,
    ...metadata
  };
}

export async function getAllData(): Promise<IconEntity[]> {
  const names = getAllNames();
  const releases = await getAllReleases();
  return Promise.all(names.map((name) => getData(name, releases)));
}
