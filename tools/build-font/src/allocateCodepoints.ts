import { getAllIconAliases, type IconAliases } from "@lucide/helpers";
import { put } from "@vercel/blob";
import path from "path";
import { promises as fs } from 'fs';
import { cwd } from "process";

export type CodePoints = Record<string, number>;

function getLatestCodePoints(): Promise<CodePoints> {
  return fs.readFile(path.join(cwd(), 'codepoints.json'),
  'utf-8').then((data: string) => JSON.parse(data) as CodePoints);
  // return fetch(`https://geoxmjocxfnaryc4.public.blob.vercel-storage.com/latest/font/codepoints.json`).then(res => res.json() as Promise<CodePoints>);
}

interface AllocateCodePointsOptions {
  saveCodePoints?: boolean;
  iconsWithAliases: IconAliases
}

export async function allocateCodePoints({
  saveCodePoints = false,
  iconsWithAliases
}: AllocateCodePointsOptions): Promise<CodePoints> {
  const baseCodePoints = await getLatestCodePoints()

  const endCodePoint = Math.max(...Object.values(baseCodePoints))

  await Promise.all(
    iconsWithAliases.map(async ([iconName, aliases]) => {
      const allAliasesHaveCodePoints = aliases.every(alias => baseCodePoints[alias])

      if (baseCodePoints[iconName] || allAliasesHaveCodePoints) {
        return;
      }

      console.log('Codepoint not found creating new one for', iconName);

      aliases.forEach((alias, index) => {
        if (baseCodePoints[alias]) {
          return;
        }

        console.log('Codepoint not found creating new one for');

        baseCodePoints[alias] = endCodePoint + index + 1;
      });
    })
  )

  return baseCodePoints;
}
