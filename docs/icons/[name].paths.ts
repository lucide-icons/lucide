import fs from "fs";
import path from "path";
import { getAllData } from "../.vitepress/lib/icons";

const directory = path.join(process.cwd(), 'icons');

export function getAllNames() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames
    .filter((fileName) => fs.existsSync(directory + '/' + path.basename(fileName, '.json') + '.svg'))
    .map((fileName) => path.basename(fileName, '.json'));
}

export default {
  paths: async () => {
    const icons = await getAllData()
    return icons.map((iconData) => {

      return {
        params: iconData,
      }
    })
  }
}
