namespace Lucide;

/// <summary>
/// Represents a single SVG child element (e.g., path, circle, rect) within an icon.
/// </summary>
public sealed class IconElement
{
    public string Tag { get; }
    public IReadOnlyDictionary<string, string> Attributes { get; }

    public IconElement(string tag, IReadOnlyDictionary<string, string> attributes)
    {
        Tag = tag;
        Attributes = attributes;
    }

    public string ToSvgString()
    {
        var attrs = string.Join(" ", Attributes.Select(a => $"{a.Key}=\"{a.Value}\""));
        return $"<{Tag} {attrs} />";
    }
}
