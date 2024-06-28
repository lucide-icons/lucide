import { readJson } from 'fs-extra/esm';
import svgtofont from 'svgtofont';
import getArgumentOptions from 'minimist';
import path from 'path';

const fontName = 'lucide';
const classNamePrefix = 'icon';
const startUnicode = 57400;

const inputDir = path.join(process.cwd(), '../../', 'outlined');
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir = 'lucide-font' } = cliArguments;
const targetDir = path.join(process.cwd(), '../../', outputDir);
const releaseMetaDataDir = path.join(process.cwd(), '../../', 'docs/.vitepress/data');
const releaseMetaDataPath = path.resolve(releaseMetaDataDir, 'releaseMetaData.json');

const releaseMetaData = convertReleaseMetaData(await getReleaseMetaData());

async function getReleaseMetaData() {
  let releaseMetaData = {};
  try {
    releaseMetaData = await readJson(releaseMetaDataPath);
  } catch (err) {
    throw new Error('Execution stopped because no release information was found.');
  }
  return releaseMetaData;
}

function convertReleaseMetaData(releaseMetaData) {
  return Object.entries(releaseMetaData)
    .map(([key, value]) => [key, addAttribute(value, 'name', key)])
    .map(([, value]) => value)
    .sort((a, b) => sortMultiple(a, b, [sortByCreatedReleaseDate, sortByName]))
    .map((value, index) => addAttribute(value, 'index', index))
    .map((value, index) => addAttribute(value, 'unicode', index + startUnicode));
}

function addAttribute(obj, attribute, value) {
  obj[attribute] = value;
  return obj;
}

function sortMultiple(a, b, collators = []) {
  const comparison = collators.shift()(a, b);
  if (comparison === 0 && collators.length > 0) return sortMultiple(a, b, collators);
  return comparison;
}

function sortByCreatedReleaseDate(a, b) {
  const dates = [a, b].map((value) => new Date(value.createdRelease.date).valueOf());
  return (dates[0] > dates[1]) - (dates[0] < dates[1]);
}

function sortByName(a, b) {
  return new Intl.Collator('en-US').compare(a.name, b.name);
}

function getIconUnicode(name) {
  const { unicode } = releaseMetaData.find(({ name: iconname }) => iconname === name);
  return String.fromCharCode(unicode);
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
