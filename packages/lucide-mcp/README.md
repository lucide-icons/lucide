# Lucide MCP Server

A Model Context Protocol (MCP) server for Lucide icons that provides tools to search for icons and generate framework-specific templates.

## Features

- **Icon Search**: Search through all Lucide icons by name, tags, categories, or aliases
- **Template Generation**: Generate framework-specific component code for React, Vue, Angular, Svelte, Preact, and Solid
- **Category Browsing**: List all categories and get icons by category
- **Fast and Efficient**: Built-in caching for optimal performance

## Installation

```bash
npm install lucide-mcp
```

## Usage

### As an MCP Server

The server can be run as a standalone MCP server:

```bash
npx lucide-mcp
```

### Available Tools

#### 1. `search_icons`

Search for icons by name, tags, categories, or aliases.

**Parameters:**

- `query` (required): Search term
- `limit` (optional): Maximum results (default: 50)
- `category` (optional): Filter by specific category

**Example:**

```json
{
  "query": "arrow",
  "limit": 10
}
```

#### 2. `get_icon_template`

Generate framework-specific template code for an icon.

**Parameters:**

- `iconName` (required): Name of the icon
- `framework` (required): Target framework (`react`, `vue`, `angular`, `svelte`, `preact`, `solid`)

**Example:**

```json
{
  "iconName": "arrow-right",
  "framework": "react"
}
```

#### 3. `list_categories`

Get all available icon categories.

**Example:**

```json
{}
```

#### 4. `get_icons_by_category`

Get all icons in a specific category.

**Parameters:**

- `category` (required): Category name

**Example:**

```json
{
  "category": "arrows"
}
```

## Supported Frameworks

- **React**: Complete React component with TypeScript support
- **Vue**: Vue 3 composition API component
- **Angular**: Angular component template
- **Svelte**: Svelte component with props
- **Preact**: Preact component (similar to React)
- **Solid**: SolidJS component

## Development

```bash
# Build the project
npm run build

# Start development mode
npm run dev

# Start the server
npm start
```

## Contributing

Please follow the [Lucide contribution guidelines](../../CONTRIBUTING.md) when contributing to this package.

## License

ISC License - see the [LICENSE](../../LICENSE) file for details.
