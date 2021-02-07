import fs from "fs";
import path from "path";
import cheerio from 'cheerio';
import tags from '../../../tags.json';
import contributers from '../../../contributers.json';

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}


export async function getData(name) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const $ = cheerio.load(fileContents);
  const content = $("svg").html();

  // const contributers = await getContributers(name);

  return {
    name,
    tags: tags[name] || [],
    contributers: contributers[name] || [],
    src: fileContents,
    content: content
  };
}

export function getAllData() {
  const names = getAllNames();

  return names.map((name) => {
    return getData(name);
  });
}
