namespace Lucazor;

/// <summary>
/// Represents a Lucide icon's SVG data.
/// </summary>
public class IconData
{
    private static readonly ISvgRenderer DefaultRenderer = new StringSvgRenderer();

    public string Name { get; }
    public IReadOnlyList<IconElement> Elements { get; }

    public IconData(string name, IReadOnlyList<IconElement> elements)
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Elements = elements ?? throw new ArgumentNullException(nameof(elements));
    }

    /// <summary>
    /// Renders the icon as a complete SVG string with default options.
    /// </summary>
    public string ToSvg() => DefaultRenderer.Render(this);

    /// <summary>
    /// Renders the icon as a complete SVG string with the specified options.
    /// </summary>
    public string ToSvg(SvgRenderOptions options) => DefaultRenderer.Render(this, options);

    /// <summary>
    /// Renders the icon as a complete SVG string with simple parameters.
    /// </summary>
    public string ToSvg(int size = 24, string stroke = "currentColor", float strokeWidth = 2f)
    {
        return DefaultRenderer.Render(this, new SvgRenderOptions
        {
            Size = size,
            Stroke = stroke,
            StrokeWidth = strokeWidth,
        });
    }

    /// <inheritdoc/>
    public override string ToString() => $"LucazorIcon({Name}, {Elements.Count} elements)";
}
