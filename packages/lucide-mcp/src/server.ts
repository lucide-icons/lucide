#!/usr/bin/env node

import {
  Server,
} from '@modelcontextprotocol/sdk/server/index.js';
import {
  StdioServerTransport,
} from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { IconService } from './icon-service';
import { TemplateService } from './template-service';
import type { SupportedFlavour } from './types';

class LucideMCPServer {
  private iconService: IconService;
  private templateService: TemplateService;
  private server: any;

  constructor() {
    this.iconService = new IconService();
    this.templateService = new TemplateService();
    this.server = new Server(
      {
        name: 'lucide-mcp',
        version: '0.0.1',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_icons',
            description: 'Search for Lucide icons by name, tags, categories, or aliases',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for icons (name, tag, category, or alias)',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of results to return (default: 50)',
                  default: 50,
                },
                category: {
                  type: 'string',
                  description: 'Filter by specific category',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_icon_template',
            description: 'Generate flavour-specific template code for a Lucide icon',
            inputSchema: {
              type: 'object',
              properties: {
                iconName: {
                  type: 'string',
                  description: 'Name of the icon to generate template for',
                },
                flavour: {
                  type: 'string',
                  enum: ['react', 'vue', 'vue-next', 'angular', 'svelte', 'preact', 'solid', 'astro', 'react-native', 'vanilla', 'node'],
                  description: 'Target flavour for the template',
                },
                framework: {
                  type: 'string',
                  enum: ['react', 'vue', 'vue-next', 'angular', 'svelte', 'preact', 'solid', 'astro', 'react-native', 'vanilla', 'node'],
                  description: 'Target framework for the template (deprecated, use flavour)',
                },
              },
              required: ['iconName'],
            },
          },
          {
            name: 'list_categories',
            description: 'Get all available icon categories',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_icons_by_category',
            description: 'Get all icons in a specific category',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Category name to filter icons by',
                },
              },
              required: ['category'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_icons':
            return await this.handleSearchIcons(args);
          case 'get_icon_template':
            return await this.handleGetIconTemplate(args);
          case 'list_categories':
            return await this.handleListCategories();
          case 'get_icons_by_category':
            return await this.handleGetIconsByCategory(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async handleSearchIcons(args: any) {
    const { query, limit = 50, category } = args;

    if (!query) {
      throw new Error('Query parameter is required');
    }

    let results;
    if (category) {
      const categoryIcons = await this.iconService.getIconsByCategory(category);
      results = categoryIcons.filter(icon =>
        icon.name.toLowerCase().includes(query.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        icon.aliases.some(alias => alias.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, limit);
    } else {
      results = await this.iconService.searchIcons(query, limit);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            query,
            total: results.length,
            icons: results,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGetIconTemplate(args: any) {
    const { iconName, flavour, framework } = args;

    if (!iconName) {
      throw new Error('iconName parameter is required');
    }

    // Accept both flavour and framework (for backward compatibility)
    const targetFlavour = flavour || framework;
    if (!targetFlavour) {
      throw new Error('flavour (or framework) parameter is required');
    }

    const supportedFlavours = this.templateService.getSupportedFlavours();
    if (!supportedFlavours.includes(targetFlavour as SupportedFlavour)) {
      throw new Error(`Unsupported flavour: ${targetFlavour}. Supported flavours: ${supportedFlavours.join(', ')}`);
    }

    const iconExists = await this.iconService.iconExists(iconName);
    if (!iconExists) {
      throw new Error(`Icon '${iconName}' not found`);
    }

    const template = this.templateService.generateTemplate(
      targetFlavour as SupportedFlavour,
      iconName
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            iconName,
            flavour,
            componentName: template.componentName,
            template: template.code,
          }, null, 2),
        },
      ],
    };
  }

  private async handleListCategories() {
    const categories = await this.iconService.getCategories();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            categories: categories.sort(),
          }, null, 2),
        },
      ],
    };
  }

  private async handleGetIconsByCategory(args: any) {
    const { category } = args;

    if (!category) {
      throw new Error('category parameter is required');
    }

    const icons = await this.iconService.getIconsByCategory(category);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            category,
            total: icons.length,
            icons,
          }, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Run the server if this file is executed directly
if (require.main === module) {
  const server = new LucideMCPServer();
  server.run().catch(console.error);
}

export default LucideMCPServer;
