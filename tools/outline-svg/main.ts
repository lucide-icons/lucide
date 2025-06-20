import { promises as fs } from 'fs';
import SVGFixer from 'oslllo-svg-fixer';
import getArgumentOptions from 'minimist';
import path from 'path';

const inputDir = path.join(process.cwd(), '../../icons');
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir = 'outlined' } = cliArguments;
const targetDir = path.join(process.cwd(), '../../', outputDir);

async function init() {
  console.time('icon outliner');
  try {
    try {
      await fs.mkdir(targetDir);
    } catch (error) {} // eslint-disable-line no-empty

    await SVGFixer(inputDir, targetDir, {
      showProgressBar: true,
      traceResolution: 800,
    }).fix();

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}

init();
