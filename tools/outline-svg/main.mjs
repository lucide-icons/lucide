import { promises as fs } from 'fs';
import path from 'path'
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson'; // eslint-disable-line import/no-extraneous-dependencies
import getArgumentOptions from 'minimist';
import Tinypool from 'tinypool'


const inputDir = path.join(process.cwd(), '../../icons')
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir = 'outlined' } = cliArguments;
const targetDir = path.join(process.cwd(), '../../', outputDir)

async function init() {
  const pool = new Tinypool({
    filename: new URL('./outlineSvg.mjs', import.meta.url).href,
  })

  console.time('icon outliner');
  try {
    await fs.mkdir(targetDir);
  } catch (err) {}

  try {
    const icons = await fs.readdir(inputDir);

    await Promise.all(
      icons.map(file => pool.run({ file, inputDir, targetDir })),
    );

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}

init();
