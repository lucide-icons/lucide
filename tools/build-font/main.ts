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

type Releases = Record<string, ReleaseMetaData>;

type ReleaseMetaData = {
  createdRelease: {
    version: string;
    date: string;
  };
  changedRelease: {
    version: string;
    date: string;
  };
};

type ReleaseMetaDataWithName = ReleaseMetaData & {
  name: string;
};

function convertReleaseMetaData(releases: Releases) {
  return Object.entries(releases)
    .map(([key, data]) => ({
      ...data,
      name: key,
    }))
    .sort((a, b) => sortMultiple(a, b, [sortByCreatedReleaseDate, sortByName]))
    .map((value, index) => ({ ...value, index }))
    .map((value, index) => ({
      ...value,
      unicode: index + startUnicode,
    }));
}

type CollatorFunction = (a: ReleaseMetaDataWithName, b: ReleaseMetaDataWithName) => number;

function sortMultiple(
  a: ReleaseMetaDataWithName,
  b: ReleaseMetaDataWithName,
  collators: CollatorFunction[] = [],
) {
  const comparison = collators?.shift?.()?.(a, b) ?? 0;
  if (comparison === 0 && collators.length > 0) return sortMultiple(a, b, collators);
  return comparison;
}

function sortByCreatedReleaseDate(a: ReleaseMetaDataWithName, b: ReleaseMetaDataWithName) {
  const [dateA, dateB] = [a, b].map((value) => new Date(value.createdRelease.date).valueOf());
  return Number(dateA > dateB) - Number(dateA < dateB);
}

function sortByName(a: ReleaseMetaDataWithName, b: ReleaseMetaDataWithName) {
  return new Intl.Collator('en-US').compare(a.name, b.name);
}

function getIconUnicode(name: string): [string, number] {
  const { unicode } = releaseMetaData.find(({ name: iconName }) => iconName === name) ?? {
    unicode: startUnicode,
  };
  return [String.fromCharCode(unicode), startUnicode];
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
        logo: undefined,
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
