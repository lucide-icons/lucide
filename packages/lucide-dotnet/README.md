# Daeha.Lucazor

Lucide icon library for .NET and Blazor. Use 1700+ beautiful & consistent open-source icons in your .NET applications.

## Packages

| Package | Target | Description |
|---------|--------|-------------|
| `Daeha.Lucazor` | netstandard2.0 | Core icon data library (zero dependencies) |
| `Daeha.Lucazor.Blazor` | net8.0+ | Blazor component with DI support |

## Installation

```bash
dotnet add package Daeha.Lucazor
dotnet add package Daeha.Lucazor.Blazor   # For Blazor apps
```

## Usage

### Direct SVG output (any .NET app)

```csharp
using Lucazor;

// Static access — compile-time safe, with full IntelliSense
var svg = LucazorIcons.Activity.ToSvg();
var svg2 = LucazorIcons.ArrowRight.ToSvg(size: 32, stroke: "red", strokeWidth: 1.5f);

// Dynamic lookup by kebab-case name (auto-initializes on first call)
var icon = LucazorIconRegistry.GetIcon("activity");
Console.WriteLine(icon?.ToSvg());

// List all available icons
foreach (var name in LucazorIconRegistry.GetIconNames())
{
    Console.WriteLine(name);
}
```

### Advanced SVG rendering

```csharp
// Full control with SvgRenderOptions
var svg = LucazorIcons.Heart.ToSvg(new SvgRenderOptions
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
var output = renderer.Render(LucazorIcons.Star, new SvgRenderOptions { Size = 16 });
```

### Icon transforms

```csharp
// Built-in transforms
LucazorIcons.ArrowRight.ToSvg(new SvgRenderOptions { Transform = IconTransform.Rotate90 });
LucazorIcons.ArrowRight.ToSvg(new SvgRenderOptions { Transform = IconTransform.FlipHorizontal });

// Custom transforms
var transform = new IconTransform { Rotate = 45, FlipX = true };
LucazorIcons.Star.ToSvg(new SvgRenderOptions { Transform = transform });
```

### Blazor Component

Register services in `Program.cs`:

```csharp
using Lucazor.Blazor;

builder.Services.AddLucazor();

// Or with custom icons:
builder.Services.AddLucazor(provider =>
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
@using Lucazor
@using Lucazor.Blazor
```

Use in your components:

```razor
@* Static reference (compile-time safe) *@
<LucazorIcon Icon="LucazorIcons.Activity" />

@* With customization *@
<LucazorIcon Icon="LucazorIcons.Heart" Size="32" Color="red" StrokeWidth="1.5f" />

@* Dynamic by name *@
<LucazorIcon Name="arrow-right" Size="16" />

@* With transform *@
<LucazorIcon Icon="LucazorIcons.ArrowUp" Transform="IconTransform.Rotate90" />

@* With CSS class and extra attributes *@
<LucazorIcon Icon="LucazorIcons.Search" CssClass="icon-search" id="search-icon" />
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
Daeha.Lucazor (netstandard2.0)           namespace Lucazor
├── IconData              — Icon SVG data (extensible)
├── IconElement           — SVG child element (path, circle, etc.)
├── LucazorIcons          — 1700+ static icon properties (generated)
├── LucazorIconRegistry   — Name-based lookup (auto-initializing)
├── IIconProvider         — DI-friendly icon provider interface
├── LucazorIconProvider   — Default provider with custom icon support
├── ISvgRenderer          — Pluggable rendering interface
├── StringSvgRenderer     — Default string renderer
├── SvgRenderOptions      — Full rendering customization
└── IconTransform         — Rotation/flip transforms

Daeha.Lucazor.Blazor (net8.0)            namespace Lucazor.Blazor
├── LucazorIcon           — Blazor component with DI injection
└── ServiceCollectionExtensions — AddLucazor() extension
```

## Icon Naming

| SVG filename | C# Property |
|---|---|
| `activity.svg` | `LucazorIcons.Activity` |
| `arrow-right.svg` | `LucazorIcons.ArrowRight` |
| `circle-dot.svg` | `LucazorIcons.CircleDot` |

For dynamic lookup, use the original kebab-case name: `LucazorIconRegistry.GetIcon("arrow-right")`.

## Regenerating Icons

When the SVG source icons are updated:

```bash
node packages/lucide-dotnet/tools/generate-icons.mjs
```

## License

ISC — see [LICENSE](../../LICENSE).
