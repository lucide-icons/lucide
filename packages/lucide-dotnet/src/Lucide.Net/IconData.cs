namespace Lucide;

/// <summary>
/// Represents a Lucide icon's SVG data.
/// </summary>
public sealed class IconData
{
    public string Name { get; }
    public IReadOnlyList<IconElement> Elements { get; }

    public IconData(string name, IReadOnlyList<IconElement> elements)
    {
        Name = name;
        Elements = elements;
    }

    /// <summary>
    /// Renders the icon as a complete SVG string.
    /// </summary>
    public string ToSvg(int size = 24, string stroke = "currentColor", float strokeWidth = 2f)
    {
        var inner = string.Join("\n  ", Elements.Select(e => e.ToSvgString()));
        return $@"<svg xmlns=""http://www.w3.org/2000/svg"" width=""{size}"" height=""{size}"" viewBox=""0 0 24 24"" fill=""none"" stroke=""{stroke}"" stroke-width=""{strokeWidth}"" stroke-linecap=""round"" stroke-linejoin=""round"">
  {inner}
</svg>";
    }
}
