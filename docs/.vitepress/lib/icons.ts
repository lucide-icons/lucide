import fs from "fs";
import path from "path";
import { IconNodeWithKeys } from "../theme/types";
import iconNodes from '../data/iconNodes'
import releaseMeta from "../data/releaseMetaData.json";

const DATE_OF_FORK = '2020-06-08T16:39:52+0100';

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

export async function getData(name: string) {
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, "utf8");
  const { tags, categories, contributors } = JSON.parse(jsonContent);

  const iconNode = iconNodes[name]

  const releaseData = releaseMeta?.[name] ?? {
    "createdRelease": {
      "version": "0.0.0",
      "date": DATE_OF_FORK
    },
    "changedRelease": {
      "version": "0.0.0",
      "date": DATE_OF_FORK
    }
  }

  return {
    name,
    tags,
    categories,
    iconNode,
    contributors,
    ...releaseData
  };
}

export async function getAllData(): Promise<{ name: string, iconNode: IconNodeWithKeys}[]> {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
