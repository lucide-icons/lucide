import { type IconAliases } from '@lucide/helpers';
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

  let maxCodePoint = Math.max(...Object.values(baseCodePoints));

  await Promise.all(
    iconsWithAliases.map(async ([iconName, aliases]) => {
      const names = [iconName, ...aliases];
      const existingCodePoints = [
        ...names
          .reduce((codePoints, name) => {
            const codePoint = baseCodePoints[name];
            if (codePoint !== undefined) {
              codePoints.add(codePoint);
            }
            return codePoints;
          }, new Set<number>()),
      ].sort((a, b) => a - b);

      if (existingCodePoints.length > 1) {
        const aliasList = aliases.join(', ');
        const codeList = existingCodePoints.join(', ');
        console.warn(
          `Conflicting code points found for ${iconName} and its aliases ${aliasList}: ${codeList}. Using lowest.`,
        );
      } else if (existingCodePoints.length === 0) {
        console.log(`Code point not found for ${iconName}. Creating new one.`);
      }

      const codePoint = existingCodePoints.length > 0 ? existingCodePoints[0] : ++maxCodePoint;
      for (const name of names) {
        if (baseCodePoints[name] !== codePoint) {
          console.log(`Assigning code point ${codePoint} to ${name}.`);
          baseCodePoints[name] = codePoint;
        }
      }
    }),
  );

  if (saveCodePoints) {
    const content = JSON.stringify(baseCodePoints, null, 2);

    await put(VERCEL_BLOB_CODEPOINTS_PATH, content, { access: 'public', allowOverwrite: true });

    console.log('Code points uploaded to Vercel Blob Storage.');
  }

  return baseCodePoints;
}
