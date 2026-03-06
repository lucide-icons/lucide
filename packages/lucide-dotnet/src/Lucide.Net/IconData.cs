using System.Globalization;
using System.Text;

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
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Elements = elements ?? throw new ArgumentNullException(nameof(elements));
    }

    /// <summary>
    /// Renders the icon as a complete SVG string.
    /// </summary>
    public string ToSvg(int size = 24, string stroke = "currentColor", float strokeWidth = 2f)
    {
        var sb = new StringBuilder(512);
        sb.Append("<svg xmlns=\"http://www.w3.org/2000/svg\"")
          .Append(" width=\"").Append(size).Append('"')
          .Append(" height=\"").Append(size).Append('"')
          .Append(" viewBox=\"0 0 24 24\"")
          .Append(" fill=\"none\"")
          .Append(" stroke=\"").Append(stroke).Append('"')
          .Append(" stroke-width=\"").Append(strokeWidth.ToString(CultureInfo.InvariantCulture)).Append('"')
          .Append(" stroke-linecap=\"round\"")
          .Append(" stroke-linejoin=\"round\"")
          .Append('>');

        for (var i = 0; i < Elements.Count; i++)
        {
            sb.Append(Elements[i].ToSvgString());
        }

        sb.Append("</svg>");
        return sb.ToString();
    }

    /// <inheritdoc/>
    public override string ToString() => $"GitIcon({Name}, {Elements.Count} elements)";
}
