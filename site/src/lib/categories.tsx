import fs from "fs";
import path from "path";
import categories from '../../../categories.json';
import {IconEntity} from "../types";

const directory = path.join(process.cwd(), "../categories");

export function getAllCategoryNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames.map((fileName) => {
    return path.basename(fileName, '.json');
  });
}

export async function getCategoryData(name: string) {
  return {
    ...JSON.parse(fs.readFileSync(path.join(directory, `${name}.json`))),
    name,
    icons: categories[name] || [],
  };
}

export async function getAllCategories(): Promise<IconEntity[]> {
  const names = getAllCategoryNames();
  return Promise.all(names.map((name) => getCategoryData(name)).sort((a, b) => {
    return (a.weight ?? 0) - (b.weight ?? 0);
  }));
}
