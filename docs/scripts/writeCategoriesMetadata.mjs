import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');
const directory = path.join(process.cwd(), '../categories');

function getAllCategoryFiles() {
  const fileNames = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  return fileNames.map((fileName) => {
    const name = path.basename(fileName, '.json');
    const fileContent = fs.readFileSync(path.join(directory, fileName), 'utf8');

    const parsedFileContent = JSON.parse(fileContent);

    return {
      name,
      title: parsedFileContent.title,
    };
  });
}

const categoriesFile = path.resolve(dataDirectory, `categoriesData.json`);

const categoriesData = getAllCategoryFiles();

fs.promises
  .writeFile(categoriesFile, JSON.stringify(categoriesData, null, 2), 'utf-8')
  .then(() => {
    console.log('Successfully written categoriesData.json file');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating the categoriesData.json file,\n ${error}`);
  });
