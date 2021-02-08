import fs from "fs";
import path from "path";
import cheerio from 'cheerio';
import tags from '../../../tags.json';
import { getContributers } from "./fetchAllContributers";

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}

export async function getData(name:string) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const $ = cheerio.load(fileContents);
  const content = $("svg").html();

  const contributers = await getContributers(name);

  return {
    name,
    tags: tags[name] || [],
    contributers,
    src: fileContents,
    content: content
  };
}

export async function getAllData() {
  const names = getAllNames();

  return Promise.all(names.map((name) => getData(name)));
}
