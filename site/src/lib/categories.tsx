import fs from "fs";
import path from "path";
import {CategoryEntity} from '../types';

const directory = path.join(process.cwd(), '../categories');

export function getAllCategoryNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'));
}

export async function getCategoryData(name: string) {
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  const categoryJson = JSON.parse(jsonContent);

  return {
    ...categoryJson,
    name,
  };
}

export async function getAllCategories(): Promise<CategoryEntity[]> {
  const names = getAllCategoryNames();
  return Promise.all(names.map((name) => getCategoryData(name)));
}
