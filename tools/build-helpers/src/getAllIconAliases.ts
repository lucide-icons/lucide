import { readAllMetadata } from "./readAllMetadata.ts";

export type IconAliases = [iconName: string, aliases: string[]][];

export const getAllIconAliases = async (iconsDir: string): Promise<IconAliases> => {
  const metaDataFiles = await readAllMetadata(iconsDir)

  return Object.entries(metaDataFiles).map(([iconName, metadata]) => {
    const { aliases } = metadata;

    if (!aliases?.length) return [iconName, []];

    const aliasesNames = aliases.map(alias =>
      typeof alias === 'string' ? alias : alias.name,
    );

    return [iconName, aliasesNames]
  })
}

