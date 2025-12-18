import { type IconAliases } from "@lucide/helpers";
import path from "path";
import { promises as fs } from 'fs';
import { cwd } from "process";

export type CodePoints = Record<string, number>;

async function getLatestCodePoints(): Promise<CodePoints> {
  const codepointsContents = await fs.readFile(path.join(cwd(), 'codepoints.json'), 'utf-8')

  return JSON.parse(codepointsContents) as CodePoints
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
      if(!baseCodePoints[iconName]) {
        console.log('Codepoint not found creating new one for', iconName);
        baseCodePoints[iconName] = endCodePoint + 1;

        console.log('YEAHHH',baseCodePoints['balloon']);
      }

      aliases.forEach((alias, index) => {
        if (baseCodePoints[alias]) {
          return;
        }

        console.log('Codepoint not found creating new one for');

        baseCodePoints[alias] = endCodePoint + index + 1;
      });
    })
  )

  if (saveCodePoints) {
    await fs.writeFile(
      path.join(cwd(), 'codepoints.json'),
      JSON.stringify(baseCodePoints, null, 2),
      'utf-8'
    );
  }

  return baseCodePoints;
}
