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
      // Check if a stable code point was already assigned to this icon
      let codepoint = baseCodePoints[iconName];
      if (!codepoint) {
        console.log(`Code point not found for ${iconName}. Creating new one.`);
        codepoint = ++maxCodePoint;
        baseCodePoints[iconName] = codepoint;
      }

      aliases.forEach((alias) => {
        if (baseCodePoints[alias]) {
          return;
        }

        // If the alias does not have a stable code point yet, reuse the one
        // assigned to the original icon
        console.log(`Code point not found for alias ${alias}. Reusing from ${iconName}.`);
        baseCodePoints[alias] = codepoint;
      });
    }),
  );

  if (saveCodePoints) {
    const content = JSON.stringify(baseCodePoints, null, 2);

    await put(VERCEL_BLOB_CODEPOINTS_PATH, content, { access: 'public', allowOverwrite: true });

    console.log('Code points uploaded to Vercel Blob Storage.');
  }

  return baseCodePoints;
}
