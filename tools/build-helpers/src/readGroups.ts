import fs from 'fs/promises';
import path from 'path';
import { getCurrentDirPath } from './getCurrentDirPath.ts';

const currentDir = getCurrentDirPath(import.meta.url);

/**
 * Absolute path of `groups/`, resolved from this module's location rather than
 * from a caller-supplied directory, so every consumer (icons, lab, categories,
 * docs) reads the same groups.
 */
export const GROUPS_DIR = path.resolve(currentDir, '../../../groups');

/**
 * Reads the reusable groups of tags from `groups/`.
 *
 * Each `<name>.json` file becomes one entry, keyed by its file name without the
 * extension. Returns an empty object when the directory does not exist.
 *
 * @param {string} [directory] Directory to read the groups from.
 * @returns {object} A map of group name to its tags
 */
export const readGroups = async (
  directory: string = GROUPS_DIR,
): Promise<Record<string, string[]>> => {
  let directoryContent: string[];

  try {
    directoryContent = await fs.readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {};
    }

    throw error;
  }

  const groupPromises = directoryContent
    .filter((file) => path.extname(file) === '.json')
    .map(async (file): Promise<[string, string[]]> => {
      const fileContent = await fs.readFile(path.join(directory, file), 'utf-8');
      const { tags } = JSON.parse(fileContent) as { tags?: string[] };
      const name = path.basename(file, '.json');

      if (!Array.isArray(tags)) {
        throw new Error(`Group '${name}' is missing a 'tags' array.`);
      }

      return [name, tags];
    });

  return Object.fromEntries(await Promise.all(groupPromises));
};
