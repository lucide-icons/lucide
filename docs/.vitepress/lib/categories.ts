import fs from 'fs';
import path from 'path';
import { Category, IconEntity } from '../theme/types';

const directory = path.join(process.cwd(), '../categories');

export function getAllCategoryFiles(): Omit<Category, 'iconCount'>[] {
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

export function mapCategoryIconCount(
  categories: Omit<Category, 'iconCount'>[],
  icons: { categories: IconEntity['categories'] }[],
): Category[] {
  return categories.map((category) => ({
    ...category,
    iconCount: icons.reduce(
      (acc, curr) => (curr.categories.includes(category.name) ? ++acc : acc),
      0,
    ),
  }));
}
