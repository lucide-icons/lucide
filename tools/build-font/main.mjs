import { readJson } from 'fs-extra/esm';
import svgtofont from 'svgtofont';
import getArgumentOptions from 'minimist';
import path from 'path';

const fontName = 'lucide';
const classNamePrefix = 'icon';
var preserveCharCodes = true;

const inputDir = path.join(process.cwd(), '../../outlined');
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir = 'lucide-font' } = cliArguments;
const targetDir = path.join(process.cwd(), '../../', outputDir);
const infoDataPath = path.resolve(targetDir, 'info.json');

const previousCharCodes = preserveCharCodes ? await getPreviousCharCodes() : [];

async function getPreviousCharCodes() {
  let charCodes = {};
  try {
    const infoData = await readJson(infoDataPath);
    charCodes = Object.fromEntries(
      Object.entries(infoData).map(([key, value]) => [key, getUnicodeNumber(value)]),
    );
  } catch (err) {
    preserveCharCodes = false;
    console.log('Info data file does not exist. Proceeding without preserving char codes.');
  }
  return charCodes;
}

function getUnicodeNumber(item) {
  return parseInt(item.unicode.slice(2, -1), 10);
}

function getIconUnicode(name, unicode) {
  if (!preserveCharCodes) return unicode;
  return previousCharCodes[name]
    ? String.fromCharCode(previousCharCodes[name])
    : String.fromCharCode(getFreeNumber());
}

let counter = 0;
function getFreeNumber() {
  counter += 1;
  return Math.max(...Object.values(previousCharCodes)) + counter;
}

async function init() {
  console.time('Font generation');
  try {
    await svgtofont({
      src: path.resolve(process.cwd(), inputDir),
      dist: path.resolve(process.cwd(), targetDir),
      // styleTemplates: path.resolve(process.cwd(), 'styles'), // Add different templates if needed
      fontName,
      classNamePrefix,
      css: {
        fontSize: 'inherit',
      },
      emptyDist: true,
      useCSSVars: false,
      outSVGReact: false,
      outSVGPath: false,
      svgicons2svgfont: {
        fontHeight: 1000, // At least 1000 is recommended
        normalize: false,
      },
      generateInfoData: true,
      website: {
        title: 'Lucide',
        logo: null,
        meta: {
          description: 'Lucide icons as TTF/EOT/WOFF/WOFF2/SVG.',
          keywords: 'Lucide,TTF,EOT,WOFF,WOFF2,SVG',
        },
        corners: {
          url: 'https://github.com/lucide-icons/lucide',
          width: 62, // default: 60
          height: 62, // default: 60
          bgColor: '#dc3545', // default: '#151513'
        },
        links: [
          {
            title: 'GitHub',
            url: 'https://github.com/lucide-icons/lucide',
          },
          {
            title: 'Feedback',
            url: 'https://github.com/lucide-icons/lucide/issues',
          },
          {
            title: 'Font Class',
            url: 'index.html',
          },
          {
            title: 'Unicode',
            url: 'unicode.html',
          },
        ],
      },
      getIconUnicode,
    });
  } catch (err) {
    console.log(err);
  }
  console.timeEnd('Font generation');
}

init();
