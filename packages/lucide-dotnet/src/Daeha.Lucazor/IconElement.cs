using System.Text;

namespace Lucazor;

/// <summary>
/// Represents a single SVG child element (e.g., path, circle, rect) within an icon.
/// </summary>
public class IconElement
{
    public string Tag { get; }
    public IReadOnlyDictionary<string, string> Attributes { get; }

    public IconElement(string tag, IReadOnlyDictionary<string, string> attributes)
    {
        Tag = tag ?? throw new ArgumentNullException(nameof(tag));
        Attributes = attributes ?? throw new ArgumentNullException(nameof(attributes));
    }

    /// <summary>
    /// Renders this element as an SVG string (e.g., &lt;path d="..." /&gt;).
    /// </summary>
    public virtual string ToSvgString()
    {
        var sb = new StringBuilder();
        sb.Append('<').Append(Tag);

        foreach (var attr in Attributes)
        {
            sb.Append(' ')
              .Append(attr.Key)
              .Append("=\"")
              .Append(XmlEscape(attr.Value))
              .Append('"');
        }

        sb.Append(" />");
        return sb.ToString();
    }

    internal static string XmlEscape(string value)
    {
        if (value.IndexOfAny(new[] { '&', '<', '>', '"' }) < 0)
            return value;

        return value
            .Replace("&", "&amp;")
            .Replace("<", "&lt;")
            .Replace(">", "&gt;")
            .Replace("\"", "&quot;");
    }
}
