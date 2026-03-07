# Daeha.Lucazor

1700+ [Lucide](https://lucide.dev) icons for .NET and Blazor. Zero dependencies. Full IntelliSense.

## Quick Start

```bash
dotnet add package Daeha.Lucazor
```

```csharp
using Lucazor;

// Compile-time safe with IntelliSense
var svg = LucazorIcons.Heart.ToSvg();
var svg2 = LucazorIcons.ArrowRight.ToSvg(size: 32, stroke: "red");

// Dynamic lookup by name
var icon = LucazorIconRegistry.GetIcon("activity");
```

## Blazor

```bash
dotnet add package Daeha.Lucazor.Blazor
```

```csharp
// Program.cs
builder.Services.AddLucazor();
```

```razor
@using Lucazor
@using Lucazor.Blazor

<LucazorIcon Icon="LucazorIcons.Heart" Size="32" Color="red" />
<LucazorIcon Name="arrow-right" Size="16" />
<LucazorIcon Icon="LucazorIcons.ArrowUp" Transform="IconTransform.Rotate90" />
```

## Features

- **1700+ icons** — all [Lucide](https://lucide.dev) icons as strongly-typed C# properties
- **Zero dependencies** — core library targets `netstandard2.0`
- **IntelliSense** — full autocompletion for every icon name
- **Customizable** — size, color, fill, stroke width, CSS class, custom attributes
- **Transforms** — rotation (90/180/270) and flip (horizontal/vertical)
- **DI support** — `IIconProvider` interface for dependency injection and testing
- **Pluggable rendering** — implement `ISvgRenderer` for WPF, MAUI, SkiaSharp, etc.
- **Custom icons** — register your own icons alongside built-in ones
- **Blazor component** — `<LucazorIcon>` with full parameter binding

## Advanced Usage

### SvgRenderOptions

```csharp
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
        { "aria-hidden", "true" }
    }
});
```

### Dependency Injection

```csharp
public class MyService
{
    private readonly IIconProvider _icons;
    public MyService(IIconProvider icons) => _icons = icons;

    public string GetIconSvg(string name) => _icons.GetIcon(name)?.ToSvg() ?? "";
}
```

### Custom Icons

```csharp
builder.Services.AddLucazor(provider =>
{
    provider.AddIcon("my-logo", new IconData("my-logo", new IconElement[] { ... }));
});
```

## Icon Naming

Icons use PascalCase in C#. For dynamic lookup, use the original kebab-case name.

| SVG | C# | Dynamic |
|-----|-----|---------|
| `activity.svg` | `LucazorIcons.Activity` | `"activity"` |
| `arrow-right.svg` | `LucazorIcons.ArrowRight` | `"arrow-right"` |

## Packages

| Package | Target | Description |
|---------|--------|-------------|
| [`Daeha.Lucazor`](https://www.nuget.org/packages/Daeha.Lucazor) | netstandard2.0 | Core library (zero dependencies) |
| [`Daeha.Lucazor.Blazor`](https://www.nuget.org/packages/Daeha.Lucazor.Blazor) | net8.0+ | Blazor component with DI |

## License

ISC — [Lucide Icons](https://lucide.dev)
