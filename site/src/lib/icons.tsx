import fs from "fs";
import path from "path";
import cheerio from 'cheerio';
import tags from '../../../tags.json';

const directory = path.join(process.cwd(), "../icons");

export function getAllNames() {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.svg$/, "");
  });
}

const getContributers = (name) => new Promise(async (resolve, reject) => {


  try {
    const res = await fetch(`https://api.github.com/repos/lucide-icons/lucide/commits?path=icons/${name}.svg`);
    const data = await res.json();

    resolve(data);
  } catch (error) {
    reject(error);
  }
});

export async function getData(name) {
  const fullPath = path.join(directory, `${name}.svg`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const $ = cheerio.load(fileContents);
  const content = $("svg").html();

  const contributers = await getContributers(name);

  console.log(contributers);


  return {
    name,
    tags: tags[name] || [],
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
