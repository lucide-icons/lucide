import fs from "fs";
import path from "path";
import {CategoryEntity, IconEntity} from '../types';
import {getAllData} from "./icons";

const directory = path.join(process.cwd(), '../categories');

export function getAllCategoryNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'));
}

export async function getCategoryData(name: string, icons: IconEntity[]) {
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  const categoryJson = JSON.parse(jsonContent);

  return {
    ...categoryJson,
    name,
    icons: icons.filter((icon) => icon.categories.includes(name)),
  };
}

export async function getAllCategories(): Promise<CategoryEntity[]> {
  const names = getAllCategoryNames();
  const icons = await getAllData();
  return Promise.all(names.map((name) => getCategoryData(name, icons)));
}
