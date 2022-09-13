import { promises as fs, constants } from 'fs';
import path from 'path';
import yaml from 'js-yaml'
import { PackageItem } from '../components/Package';

const fileExist = (filePath) => fs.access(filePath, constants.F_OK).then(() => true).catch(() => false)

const fetchPackages = async (): Promise<PackageItem[]> => {
  const docsDir = path.resolve(process.cwd(), '../packages');
  const fileNames = await (await fs.readdir(docsDir)).map(filename => ({filename, directory: docsDir}))

  const packageJsons = await Promise.all(fileNames.map( async ({filename, directory}) => {
    const filePath = path.resolve(directory, filename)
    const fileStat = await fs.lstat(filePath);

    if(!fileStat.isDirectory()) return null;

    const jsonFilePath = path.resolve(filePath, 'package.json')
    if (await fileExist(jsonFilePath)) {
      return JSON.parse(
        await fs.readFile(jsonFilePath, 'utf-8')
      )
    }

    const ymlFilePath = path.resolve(filePath, 'pubspec.yaml')
    if(await fileExist(ymlFilePath)) {
      return yaml.load(
        await fs.readFile(ymlFilePath, 'utf-8')
      );
    }

    return null
  }))

  return packageJsons
}

export default fetchPackages;
