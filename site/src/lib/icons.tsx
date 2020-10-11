import fs from "fs";
import path from "path";
import tags from '../../../tags.json';

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}

export function getData(name) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return {
    name,
    tags: tags[name] || [],
    src: fileContents,
  };
}

export function getAllData() {
  const names = getAllNames();

  return names.map((name) => {
    return getData(name);
  });
}
