import { promises as fs } from 'fs';
import SVGFixer from 'oslllo-svg-fixer';
import { type IconAliases } from '@lucide/helpers';
import path from 'path';

interface OutlineSVGOptions {
  iconsDir: string;
  outlinedDir: string;
  iconsWithAliases: IconAliases;
}

export async function outlineSVG({ iconsDir, outlinedDir, iconsWithAliases }: OutlineSVGOptions) {
  console.time('icon outliner');
  try {
    try {
      await fs.mkdir(outlinedDir);
    } catch (error) {} // eslint-disable-line no-empty

    await SVGFixer(iconsDir, outlinedDir, {
      showProgressBar: true,
      traceResolution: 800,
    }).fix();

    console.log('Duplicate icons with aliases..');

    await Promise.all(
      iconsWithAliases.map(async ([iconName, aliases]) => {
        const sourcePath = path.join(outlinedDir, `${iconName}.svg`);

        await Promise.all(
          aliases.map(async (aliasName) => {
            const destinationPath = path.join(outlinedDir, `${aliasName}.svg`);

            try {
              await fs.copyFile(sourcePath, destinationPath);
              console.log(`Copied ${iconName}.svg to ${aliasName}.svg`);
            } catch (err) {
              console.log(`Failed to copy ${sourcePath} to ${destinationPath}:`, err);
            }
          }),
        );
      }),
    );

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}
