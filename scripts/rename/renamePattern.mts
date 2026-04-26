import path from 'path';
import { getCurrentDirPath, readSvgDirectory } from '../../tools/build-helpers/helpers.ts';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { renameIcon } from './renameIcon.function.mts';
import { type Arguments } from 'yargs';

async function main() {
  const currentDir = getCurrentDirPath(import.meta.url);
  const ICONS_DIR = path.resolve(currentDir, '../../icons');
  const svgFiles = await readSvgDirectory(ICONS_DIR);
  const iconNames = svgFiles.map((icon) => icon.split('.')[0]).reverse();
  const argv = (yargs(hideBin(process.argv))
  // @ts-ignore
    .usage('$0 <pattern> <replacement>', 'Renames all icons matching a pattern', (yargs) => {
      yargs
        .positional('pattern', {
          type: 'string',
          demandOption: true,
          describe: 'A regular expression, e.g. "^rhombus-(.+)$"',
        })
        .positional('replacement', {
          type: 'string',
          demandOption: true,
          describe: 'A replacement string, e.g. "diamond-\\1"',
        });
    })
    .strictCommands()
    .options({
      'dry-run': { type: 'boolean', default: false, alias: 'd' },
      'add-alias': { type: 'boolean', default: true, alias: 'a' },
    })
    .parse()) as unknown as Arguments<{
      pattern: string;
      replacement: string;
      dryRun: boolean;
      addAlias: boolean;
    }>;

  const pattern = new RegExp(argv?.pattern, 'g');
  const replacement = argv.replacement.replaceAll(/\\([0-9]+)/g, (s, i) => `$${i}`);

  if (!(pattern instanceof RegExp)) {
    console.error(`${pattern} is not a valid regular expression.`);
    process.exit(1);
  }

  for (const oldName of iconNames.filter((name) => pattern.test(name))) {
    const newName = oldName.replaceAll(pattern, replacement);
    console.log(`Renaming ${oldName} => ${newName}`);

    try {
      if (!argv.dryRun) {
        await renameIcon(ICONS_DIR, oldName, newName, false, argv.addAlias);
      }
    } catch (err) {
       if(err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
    }
  }
}

main();
