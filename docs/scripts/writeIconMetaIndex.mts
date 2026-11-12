import fs from 'fs';
import path from 'path';
import { readAllMetadata } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');

const location = path.resolve(currentDir, '.vitepress/data', 'iconMetaData.ts');

if (fs.existsSync(location)) {
  fs.unlinkSync(location);
}

// The docs read this index raw and never re-resolve, so resolve the
// `$extends:<icon-name>` markers here and bake the inherited
// tags/categories/contributors into the generated file.
const iconMetaData = await readAllMetadata(ICONS_DIR);

try {
  await fs.promises.writeFile(
    location,
    `export default ${JSON.stringify(iconMetaData, null, 2)};\n`,
    'utf-8',
  );

  console.log('Successfully write icon json file index');
} catch (error) {
  throw new Error(`Something went wrong generating icon json file index file,\n ${error}`);
}
