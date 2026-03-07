# Lucide .NET

Lucide icon library for .NET and Blazor. Use 1700+ beautiful & consistent open-source icons in your .NET applications.

## Packages

| Package | Target | Description |
|---------|--------|-------------|
| `Lucide.Net` | netstandard2.0 | Core icon data library (zero dependencies) |
| `Lucide.Blazor` | net8.0+ | Blazor component with DI support |

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

### Advanced SVG rendering

```csharp
// Full control with SvgRenderOptions
var svg = LucideIcons.Heart.ToSvg(new SvgRenderOptions
{
    Size = 48,
    Stroke = "#ff0000",
    Fill = "pink",
    StrokeWidth = 1.5f,
    CssClass = "icon-heart",
    Transform = IconTransform.Rotate90,
    Attributes = new Dictionary<string, string>
    {
        { "data-testid", "heart-icon" },
        { "aria-hidden", "true" },
    }
});

// Use a custom renderer
ISvgRenderer renderer = new StringSvgRenderer();
var output = renderer.Render(LucideIcons.Star, new SvgRenderOptions { Size = 16 });
```

### Icon transforms

```csharp
// Built-in transforms
LucideIcons.ArrowRight.ToSvg(new SvgRenderOptions { Transform = IconTransform.Rotate90 });
LucideIcons.ArrowRight.ToSvg(new SvgRenderOptions { Transform = IconTransform.FlipHorizontal });

// Custom transforms
var transform = new IconTransform { Rotate = 45, FlipX = true };
LucideIcons.Star.ToSvg(new SvgRenderOptions { Transform = transform });
```

### Blazor Component

Register services in `Program.cs`:

```csharp
using Lucide.Blazor;

builder.Services.AddLucideIcons();

// Or with custom icons:
builder.Services.AddLucideIcons(provider =>
{
    provider.AddIcon("my-logo", new IconData("my-logo", new IconElement[]
    {
        new IconElement("circle", new ReadOnlyDictionary<string, string>(
            new Dictionary<string, string> { { "cx", "12" }, { "cy", "12" }, { "r", "10" } }))
    }));
});
```

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

@* With transform *@
<LucideIcon Icon="LucideIcons.ArrowUp" Transform="IconTransform.Rotate90" />

@* With CSS class and extra attributes *@
<LucideIcon Icon="LucideIcons.Search" CssClass="icon-search" id="search-icon" />
```

### Dependency Injection

The `IIconProvider` interface supports DI and testing:

```csharp
public class MyService
{
    private readonly IIconProvider _icons;

    public MyService(IIconProvider icons) => _icons = icons;

    public string GetIconSvg(string name)
    {
        var icon = _icons.GetIcon(name);
        return icon?.ToSvg() ?? "";
    }
}
```

### Custom ISvgRenderer

Implement `ISvgRenderer` to render icons to different targets:

```csharp
// Example: WPF DrawingGroup renderer
public class WpfSvgRenderer : ISvgRenderer
{
    public string Render(IconData icon, SvgRenderOptions? options = null)
    {
        // Convert IconData to WPF-compatible XAML DrawingGroup
        // ...
    }
}

// Register your custom renderer
builder.Services.AddSingleton<ISvgRenderer, WpfSvgRenderer>();
```

## Architecture

```
Lucide.Net (netstandard2.0)
├── IconData              — Icon SVG data (unsealed, extensible)
├── IconElement           — SVG child element (path, circle, etc.)
├── LucideIcons           — 1700+ static icon properties (generated)
├── LucideIconRegistry    — Name-based lookup (auto-initializing)
├── IIconProvider         — DI-friendly icon provider interface
├── LucideIconProvider    — Default provider with custom icon support
├── ISvgRenderer          — Pluggable rendering interface
├── StringSvgRenderer     — Default string renderer
├── SvgRenderOptions      — Full rendering customization
└── IconTransform         — Rotation/flip transforms

Lucide.Blazor (net8.0)
├── LucideIcon            — Blazor component with DI injection
└── ServiceCollectionExtensions — AddLucideIcons() extension
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
