# Lucide .NET

Lucide icon library for .NET and Blazor. Use 1700+ beautiful & consistent open-source icons in your .NET applications.

## Packages

| Package | Target | Description |
|---------|--------|-------------|
| `Lucide.Net` | netstandard2.0 | Core icon data library (zero dependencies) |
| `Lucide.Blazor` | net8.0+ | Blazor component for rendering icons |

## Installation

```bash
dotnet add package Lucide.Net
dotnet add package Lucide.Blazor   # For Blazor apps
```

## Usage

### Direct SVG output (any .NET app)

```csharp
using Lucide;

// Static access — compile-time safe, with full IntelliSense
var svg = LucideIcons.Activity.ToSvg();
var svg2 = LucideIcons.ArrowRight.ToSvg(size: 32, stroke: "red", strokeWidth: 1.5f);

// Dynamic lookup by kebab-case name (auto-initializes on first call)
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
@using Lucide
@using Lucide.Blazor
```

Use in your components:

```razor
@* Static reference (compile-time safe) *@
<LucideIcon Icon="LucideIcons.Activity" />

@* With customization *@
<LucideIcon Icon="LucideIcons.Heart" Size="32" Color="red" StrokeWidth="1.5f" />

@* Dynamic by name *@
<LucideIcon Name="arrow-right" Size="16" />

@* With CSS class and extra attributes *@
<LucideIcon Icon="LucideIcons.Search" CssClass="icon-search" id="search-icon" />
```

## Icon Naming

| SVG filename | C# Property |
|---|---|
| `activity.svg` | `LucideIcons.Activity` |
| `arrow-right.svg` | `LucideIcons.ArrowRight` |
| `circle-dot.svg` | `LucideIcons.CircleDot` |

For dynamic lookup, use the original kebab-case name: `LucideIconRegistry.GetIcon("arrow-right")`.

## Regenerating Icons

When the SVG source icons are updated:

```bash
node packages/lucide-dotnet/tools/generate-icons.mjs
```

## License

ISC — see [LICENSE](../../LICENSE).
