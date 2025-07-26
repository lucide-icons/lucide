import { readFile, readdir } from 'fs/promises';
import * as path from 'path';
import type { IconData, IconMetadata, IconSearchResult } from './types';

async function getIconMetaData(iconDirectory: string): Promise<Record<string, IconMetadata>> {
  const files = await readdir(iconDirectory);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  const metadataEntries = await Promise.all(
    jsonFiles.map(async (jsonFile: string) => {
      const content = await readFile(path.join(iconDirectory, jsonFile), 'utf-8');
      const metadata = JSON.parse(content) as IconMetadata;
      return [path.basename(jsonFile, '.json'), metadata];
    }),
  );

  return Object.fromEntries(metadataEntries);
}

export class IconService {
  private iconCache: Map<string, IconData> = new Map();
  private metadataCache: Record<string, IconMetadata> | null = null;
  private iconsDirectory: string;

  constructor(iconsDirectory?: string) {
    // Default to the icons directory relative to the server script location
    // When running from dist/server.js, we need to go up to the workspace root and find icons
    this.iconsDirectory = iconsDirectory || path.resolve(__dirname, '../../../icons');
  }

  async getIconMetadata(): Promise<Record<string, IconMetadata>> {
    if (this.metadataCache) {
      return this.metadataCache;
    }

    try {
      this.metadataCache = await getIconMetaData(this.iconsDirectory);
      return this.metadataCache;
    } catch (error) {
      console.error('Error loading icon metadata:', error);
      return {};
    }
  }

  async getIconData(iconName: string): Promise<IconData | null> {
    // Check cache first
    if (this.iconCache.has(iconName)) {
      return this.iconCache.get(iconName)!;
    }

    try {
      const metadataPath = path.join(this.iconsDirectory, `${iconName}.json`);
      const svgPath = path.join(this.iconsDirectory, `${iconName}.svg`);

      const [metadataContent, svgContent] = await Promise.all([
        readFile(metadataPath, 'utf-8'),
        readFile(svgPath, 'utf-8')
      ]);

      const metadata: IconMetadata = JSON.parse(metadataContent);
      const iconData: IconData = {
        name: iconName,
        metadata,
        svgContent
      };

      // Cache the result
      this.iconCache.set(iconName, iconData);
      return iconData;
    } catch (error) {
      console.error(`Error loading icon data for ${iconName}:`, error);
      return null;
    }
  }

  async searchIcons(query: string, limit: number = 50): Promise<IconSearchResult[]> {
    const metadata = await this.getIconMetadata();
    const results: IconSearchResult[] = [];
    const queryLower = query.toLowerCase();

    for (const [iconName, iconMetadata] of Object.entries(metadata)) {
      const score = this.calculateRelevanceScore(iconName, iconMetadata, queryLower);

      if (score > 0) {
        const aliases = (iconMetadata.aliases || []).map(alias =>
          typeof alias === 'string' ? alias : alias.name
        );

        results.push({
          name: iconName,
          tags: iconMetadata.tags || [],
          categories: iconMetadata.categories || [],
          aliases
        });
      }
    }

    // Sort by relevance and limit results
    return results
      .sort((a, b) => this.calculateRelevanceScore(b.name, metadata[b.name], queryLower) -
                      this.calculateRelevanceScore(a.name, metadata[a.name], queryLower))
      .slice(0, limit);
  }

  async getAllIconNames(): Promise<string[]> {
    try {
      const files = await readdir(this.iconsDirectory);
      return files
        .filter((file: string) => file.endsWith('.svg'))
        .map((file: string) => path.basename(file, '.svg'))
        .sort();
    } catch (error) {
      console.error('Error reading icons directory:', error);
      return [];
    }
  }

  async getIconsByCategory(category: string): Promise<IconSearchResult[]> {
    const metadata = await this.getIconMetadata();
    const results: IconSearchResult[] = [];

    for (const [iconName, iconMetadata] of Object.entries(metadata)) {
      if (iconMetadata.categories?.includes(category)) {
        const aliases = (iconMetadata.aliases || []).map(alias =>
          typeof alias === 'string' ? alias : alias.name
        );

        results.push({
          name: iconName,
          tags: iconMetadata.tags || [],
          categories: iconMetadata.categories || [],
          aliases
        });
      }
    }

    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCategories(): Promise<string[]> {
    const metadata = await this.getIconMetadata();
    const categories = new Set<string>();

    for (const iconMetadata of Object.values(metadata)) {
      if (iconMetadata.categories) {
        iconMetadata.categories.forEach(category => categories.add(category));
      }
    }

    return Array.from(categories).sort();
  }

  async iconExists(iconName: string): Promise<boolean> {
    const metadata = await this.getIconMetadata();
    return iconName in metadata;
  }

  private calculateRelevanceScore(iconName: string, metadata: IconMetadata, query: string): number {
    let score = 0;

    // Exact name match gets highest score
    if (iconName.toLowerCase() === query) {
      score += 100;
    } else if (iconName.toLowerCase().includes(query)) {
      score += 50;
    }

    // Check tags
    if (metadata.tags) {
      for (const tag of metadata.tags) {
        if (tag.toLowerCase() === query) {
          score += 80;
        } else if (tag.toLowerCase().includes(query)) {
          score += 30;
        }
      }
    }

    // Check categories
    if (metadata.categories) {
      for (const category of metadata.categories) {
        if (category.toLowerCase() === query) {
          score += 60;
        } else if (category.toLowerCase().includes(query)) {
          score += 20;
        }
      }
    }

    // Check aliases
    if (metadata.aliases) {
      for (const alias of metadata.aliases) {
        const aliasName = typeof alias === 'string' ? alias : alias.name;
        if (aliasName.toLowerCase() === query) {
          score += 70;
        } else if (aliasName.toLowerCase().includes(query)) {
          score += 25;
        }
      }
    }

    return score;
  }
}
