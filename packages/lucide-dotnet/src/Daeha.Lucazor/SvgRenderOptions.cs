using System.Globalization;

namespace Lucazor;

/// <summary>
/// Options for rendering an icon as SVG.
/// </summary>
public class SvgRenderOptions
{
    /// <summary>Icon size in pixels. Default is 24.</summary>
    public int Size { get; set; } = 24;

    /// <summary>Stroke color. Default is "currentColor".</summary>
    public string Stroke { get; set; } = "currentColor";

    /// <summary>Fill color. Default is "none".</summary>
    public string Fill { get; set; } = "none";

    /// <summary>Stroke width. Default is 2.</summary>
    public float StrokeWidth { get; set; } = 2f;

    /// <summary>Stroke line cap. Default is "round".</summary>
    public string StrokeLineCap { get; set; } = "round";

    /// <summary>Stroke line join. Default is "round".</summary>
    public string StrokeLineJoin { get; set; } = "round";

    /// <summary>CSS class to apply to the SVG element.</summary>
    public string? CssClass { get; set; }

    /// <summary>Custom attributes to add to the SVG element.</summary>
    public Dictionary<string, string>? Attributes { get; set; }

    /// <summary>Transform to apply to the icon.</summary>
    public IconTransform? Transform { get; set; }

    /// <summary>Default render options.</summary>
    public static SvgRenderOptions Default { get; } = new();

    internal string StrokeWidthString =>
        StrokeWidth.ToString(CultureInfo.InvariantCulture);
}
