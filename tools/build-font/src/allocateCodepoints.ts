import { type IconAliases } from '@lucide/helpers';
import path from 'path';
import { promises as fs } from 'fs';
import { cwd } from 'process';
import { put } from '@vercel/blob';

const VERCEL_BLOB_CODEPOINTS_PATH = 'latest/font/codepoints.json';

export type CodePoints = Record<string, number>;

async function getLatestCodePoints(): Promise<CodePoints> {
  const codepointsContents = await fetch(
    `https://geoxmjocxfnaryc4.public.blob.vercel-storage.com/${VERCEL_BLOB_CODEPOINTS_PATH}`,
  );

  return codepointsContents.json() as Promise<CodePoints>;
}

interface AllocateCodePointsOptions {
  saveCodePoints?: boolean;
  iconsWithAliases: IconAliases;
}

export async function allocateCodePoints({
  saveCodePoints = false,
  iconsWithAliases,
}: AllocateCodePointsOptions): Promise<CodePoints> {
  const baseCodePoints = await getLatestCodePoints();

  const endCodePoint = Math.max(...Object.values(baseCodePoints));

  await Promise.all(
    iconsWithAliases.map(async ([iconName, aliases]) => {
      if (!baseCodePoints[iconName]) {
        console.log('Code point not found creating new one for', iconName);
        baseCodePoints[iconName] = endCodePoint + 1;
      }

      aliases.forEach((alias, index) => {
        if (baseCodePoints[alias]) {
          return;
        }

        console.log('Code point not found creating new one for', alias);

        baseCodePoints[alias] = endCodePoint + index + 1;
      });
    }),
  );

  if (saveCodePoints) {
    const content = JSON.stringify(baseCodePoints, null, 2);
    await fs.writeFile(path.join(cwd(), 'codepoints.json'), content, 'utf-8');

    await put(VERCEL_BLOB_CODEPOINTS_PATH, content, { access: 'public', allowOverwrite: true });

    console.log('Code points saved to codepoints.json and uploaded to Vercel Blob Storage.');
  }

  return baseCodePoints;
}
