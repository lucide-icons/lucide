# Lucide .NET

Lucide icon library for .NET and Blazor. Use 1700+ beautiful & consistent icons in your .NET applications.

## Packages

| Package | Description |
|---------|-------------|
| `Lucide.Net` | Core icon data library (netstandard2.0) |
| `Lucide.Blazor` | Blazor component for rendering icons |

## Installation

```bash
dotnet add package Lucide.Net
dotnet add package Lucide.Blazor   # For Blazor apps
```

## Usage

### Direct SVG output (any .NET app)

```csharp
using Lucide;

// Access icon by static property (like React's named imports)
var svg = LucideIcons.Activity.ToSvg(size: 24, stroke: "black");
var svg2 = LucideIcons.ArrowRight.ToSvg();

// Dynamic lookup by name
LucideIcons.RegisterAll();
var icon = LucideIconRegistry.GetIcon("activity");
Console.WriteLine(icon?.ToSvg());

// List all available icons
foreach (var name in LucideIconRegistry.GetIconNames())
{
    Console.WriteLine(name);
}
```

### Blazor Component

Add to your `_Imports.razor`:
```razor
@using Lucide.Blazor
```

Use in your components:
```razor
@* Static reference (compile-time safe) *@
<LucideIcon Icon="LucideIcons.Activity" />

@* With customization *@
<LucideIcon Icon="LucideIcons.Heart" Size="32" Color="red" StrokeWidth="1.5" />

@* Dynamic by name (runtime lookup) *@
<LucideIcon Name="arrow-right" Size="16" />

@* With CSS class and extra attributes *@
<LucideIcon Icon="LucideIcons.Search" CssClass="icon-search" id="search-icon" />
```

## Icon Names

Icons use PascalCase for C# properties:

| SVG filename | C# Property |
|---|---|
| `activity.svg` | `LucideIcons.Activity` |
| `arrow-right.svg` | `LucideIcons.ArrowRight` |
| `circle-dot.svg` | `LucideIcons.CircleDot` |

For dynamic name lookup, use the original kebab-case name: `LucideIconRegistry.GetIcon("arrow-right")`.

## Regenerating Icons

If the SVG source icons are updated, regenerate the C# source:

```bash
node packages/lucide-dotnet/tools/generate-icons.mjs
```
