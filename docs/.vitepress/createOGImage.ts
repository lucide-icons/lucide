import { PageData } from 'vitepress';
import fs from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';
import sharp from 'sharp';

const generalSVGTemplate = fs.readFile(join(cwd(), '.vitepress/lib/guideOGTemplate.svg'), 'utf-8');

export async function createGeneralOGImage({ title, description, relativePath }: PageData) {
  const fileName = relativePath.replace(/\.md$/, '.png').replace(/\//g, '-');

  const path = join(cwd(), 'public/og', fileName);

  let desc = description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (!desc) {
    desc = '';
  }
  const lines = desc.replace(/(?![^\n]{1,64}$)([^\n]{1,64})\s/g, '$1\n').split('\n');
  const data = {
    title: title,
    line1: lines[0] || '',
    line2: lines[1] || '',
    line3: lines[2] || '',
    line4: lines[3] || '',
  };
  const svgTemplate = await generalSVGTemplate;
  const svg = svgTemplate.replace(/\{\{([^}]+)\}\}/g, (_, name: keyof typeof data) => data[name]);

  console.log(`Generating ${fileName}`);
  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(path);
  } catch (e) {
    console.error('Error generating', { filename: path, ...data, svg });
    console.error(e);
  }

  return `/og/${fileName}`;
}

const iconSVGTemplate = fs.readFile(join(cwd(), '.vitepress/lib/iconOGTemplate.svg'), 'utf-8');

export async function createIconOGImage(iconName: string, tags: string[]) {
  const path = join(cwd(), 'public/og', `icon-${iconName}.png`);

  let iconSVG = await fs.readFile(join(cwd(), `../icons/${iconName}.svg`), 'utf-8');
  iconSVG = iconSVG
    .replace('width="24"', 'width="320"')
    .replace('height="24"', 'height="320"')
    .replace('currentColor', '#dfdfd6')
    .replace(
      'xmlns="http://www.w3.org/2000/svg"',
      'xmlns="http://www.w3.org/2000/svg" x="62" y="66"',
    );

  const data = {
    name: iconName,
    tags: tags.join(' • ').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;'),
    iconSVG,
  };

  const svgTemplate = await iconSVGTemplate;
  const svg = svgTemplate.replace(/\{\{([^}]+)\}\}/g, (_, name: keyof typeof data) => data[name]);

  console.log(`Generating ${path}`);
  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(path);
  } catch (e) {
    console.error('Error generating', { filename: path, ...data, svg });
    console.error(e);
  }

  return `/og/icon-${iconName}.png`;
}
