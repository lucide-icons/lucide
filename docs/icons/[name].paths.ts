import fs from "fs";
import path from "path";
import { getAllData } from "../.vitepress/lib/icons";
import createCodeExamples from "../.vitepress/lib/createCodeExamples";



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

    const result = await createCodeExamples('activity')
    // const codeExamplesPromises = icons.map(async (icon) => {
    //   return createCodeExamples(icon.name);
    // })

    // const codeExamples = await Promise.all(codeExamplesPromises);


    return icons.map((iconData, index) => {
      const params = {
        ...iconData,
        codeExamples: result
      };

      return {
        params,
      }
    })
  }
}
