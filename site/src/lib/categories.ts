import fs from "fs";
import path from "path";
import { Category } from "../types";

const directory = path.join(process.cwd(), "../categories");

export function getAllCategoryFiles() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'));
}

export async function getData(name: string): Promise<Category> {
  const jsonPath = path.join(directory, `${name}.json`);
  const jsonContent = fs.readFileSync(jsonPath, "utf8");
  const categoryJson = JSON.parse(jsonContent);

  return {
    ...categoryJson,
    name,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const names = getAllCategoryFiles();

  return Promise.all(names.map((name) => getData(name)));
}
