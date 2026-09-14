import fs from 'fs/promises';
import path from 'path';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');
const directory = path.join(process.cwd(), '../categories');

async function getAllCategoryFiles() {
  const categoryDirectoryContents = await fs.readdir(directory);
  const fileNames = categoryDirectoryContents.filter((file) => path.extname(file) === '.json');

  const categoryJSONReadPromises = fileNames.map(async (fileName) => {
    const name = path.basename(fileName, '.json');
    const fileContent = await fs.readFile(path.join(directory, fileName), 'utf8');

    const parsedFileContent = JSON.parse(fileContent);

    return {
      name,
      title: parsedFileContent.title,
    };
  });

  return Promise.all(categoryJSONReadPromises);
}

const categoriesFile = path.resolve(dataDirectory, `categoriesData.json`);

const categoriesData = await getAllCategoryFiles();

fs.writeFile(categoriesFile, JSON.stringify(categoriesData, null, 2), 'utf-8')
  .then(() => {
    console.log('Successfully written categoriesData.json file');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating the categoriesData.json file,\n ${error}`);
  });
