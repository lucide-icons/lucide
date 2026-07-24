import { type IconAliases } from '@lucide/helpers';
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
  allowFixes?: boolean;
  iconsWithAliases: IconAliases;
}

export async function allocateCodePoints({
  saveCodePoints = false,
  allowFixes = false,
  iconsWithAliases,
}: AllocateCodePointsOptions): Promise<CodePoints> {
  const latestCodePoints = await getLatestCodePoints();

  let maxCodePoint = Math.max(...Object.values(latestCodePoints));
  let codePointMap = new Map<number, string>();
  let newCodePoints: CodePoints = {};

  for (const [iconName, aliases] of iconsWithAliases) {
    let codePoint: number | null = null;

    // Check if the icon is already present.
    if (iconName in latestCodePoints) {
      codePoint = latestCodePoints[iconName];
    }

    // Check if one of the aliases of the icon is already present, we need to add this as a legacy codepoint for backwards compatibility
    for (const alias of aliases) {
      if (alias in latestCodePoints) {
        if (codePoint && codePoint !== latestCodePoints[alias]) {
          if (codePointMap.has(latestCodePoints[alias])) {
            if (allowFixes) {
              console.warn(
                `The code point for alias '${alias}' for '${iconName}' is already allocated to: '${codePointMap.get(latestCodePoints[alias])}', we're simply not adding this custom alias codepoint.`,
              );
            } else {
              throw new Error(
                `The code point for alias '${alias}' for '${iconName}' is already allocated to: '${codePointMap.get(latestCodePoints[alias])}'.`,
              );
            }
          } else {
            console.log(
              `'${alias}' uses a different codepoint than its canonical name '${iconName}', adding a legacy alias codepoint for: ${latestCodePoints[alias]}.`,
            );
            codePointMap.set(latestCodePoints[alias], iconName);
            newCodePoints[alias] = latestCodePoints[alias];
          }
        }
        codePoint ??= latestCodePoints[alias];
      }
    }

    // Assign a new codepoint, if no existing code point was found.
    codePoint ??= ++maxCodePoint;

    if (allowFixes && codePointMap.has(codePoint)) {
      console.warn(
        `Assigning a new codepoint for '${iconName}', since '${codePoint}' was already taken up by '${codePointMap.get(codePoint)}'.`,
      );
      codePoint = ++maxCodePoint;
    }

    if (codePointMap.has(codePoint)) {
      throw new Error(
        `We couldn't assign a unique codepoint for '${iconName}', since '${codePoint}' was already taken up by '${codePointMap.get(codePoint)}'`,
      );
    }

    codePointMap.set(codePoint, iconName);
    for (const name of [iconName, ...aliases]) {
      if (!newCodePoints[name]) {
        newCodePoints[name] = codePoint;
      }
    }
  }

  // Write the changes to the original map to keep its order.
  for (const [name, codePoint] of Object.entries(newCodePoints)) {
    latestCodePoints[name] = codePoint;
  }

  if (saveCodePoints) {
    const content = JSON.stringify(latestCodePoints, null, 2);

    await put(VERCEL_BLOB_CODEPOINTS_PATH, content, { access: 'public', allowOverwrite: true });

    console.log('Code points uploaded to Vercel Blob Storage.');
  }

  return latestCodePoints;
}
