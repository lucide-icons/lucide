import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { type Group, type IconJson } from './metadata.mts';

// Resolve repo paths relative to this module so they work no matter which
// directory the script is invoked from. The module lives in
// `.github/actions/suggest-metadata/src`, four levels below the repo root.
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.join(moduleDir, "../../../..");
const iconsDir = path.join(repoRoot, "icons");
const categoriesDir = path.join(repoRoot, "categories");
const groupsDir = path.join(repoRoot, "groups");
const metadataInstructionsPath = path.join(
  repoRoot,
  '.github/instructions/metadata.instructions.md',
);

// Load the allowed categories (name + human-readable title) straight from the
// `categories/` directory so we can both validate suggestions and give the
// model a description of every category.
export async function loadCategories() {
  const files = (await fs.readdir(categoriesDir)).filter((file) => file.endsWith('.json'));

  const categories = await Promise.all(
    files.map(async (file) => {
      const { title, description } = JSON.parse(
        await fs.readFile(path.join(categoriesDir, file), 'utf-8'),
      );
      return { name: path.basename(file, '.json'), title, description };
    }),
  );

  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

export type Category = Awaited<ReturnType<typeof loadCategories>>[number];

// Load the tag groups from `groups/`. The model needs each group's tags to know
// what an icon already has, and its description to know when a group applies.
export async function loadGroups(): Promise<Record<string, Group>> {
  let files: string[];
  try {
    files = (await fs.readdir(groupsDir)).filter((file) => file.endsWith('.json'));
  } catch (error) {
    if ((error as { code?: string }).code === 'ENOENT') return {};
    throw error;
  }

  const groups = await Promise.all(
    files.map(async (file): Promise<[string, Group]> => {
      const { description, tags } = JSON.parse(
        await fs.readFile(path.join(groupsDir, file), 'utf-8'),
      );
      return [path.basename(file, '.json'), { description, tags }];
    }),
  );

  return Object.fromEntries(groups);
}

// Read the metadata of every icon as it is written, markers included. Files
// are read sequentially to keep the number of open file handles bounded.
export async function loadIcons() {
  const fileNames = (await fs.readdir(iconsDir)).filter((file) => file.endsWith('.json')).sort();

  const icons: Record<string, IconJson> = {};
  for (const fileName of fileNames) {
    try {
      icons[path.basename(fileName, '.json')] = JSON.parse(
        await fs.readFile(path.join(iconsDir, fileName), 'utf-8'),
      );
    } catch {
      // Ignore files that fail to parse.
    }
  }

  return icons;
}

// The instructions file is shared with other tooling and also covers properties
// we don't suggest here (e.g. `contributors`). Drop those sections so the model
// doesn't try to squeeze them into one of the fields it can return.
export async function loadMetadataInstructions() {
  const content = await fs.readFile(metadataInstructionsPath, 'utf-8');
  return content
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/^## Contributors\r?\n[\s\S]*?(?=^## )/m, '')
    .trim();
}
