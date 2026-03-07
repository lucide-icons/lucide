using System.Text;

namespace Lucazor;

/// <summary>
/// Default SVG renderer that produces an SVG string.
/// </summary>
public class StringSvgRenderer : ISvgRenderer
{
    /// <inheritdoc/>
    public virtual string Render(IconData icon, SvgRenderOptions? options = null)
    {
        var opts = options ?? SvgRenderOptions.Default;
        var sb = new StringBuilder(512);

        sb.Append("<svg xmlns=\"http://www.w3.org/2000/svg\"")
          .Append(" width=\"").Append(opts.Size).Append('"')
          .Append(" height=\"").Append(opts.Size).Append('"')
          .Append(" viewBox=\"0 0 24 24\"")
          .Append(" fill=\"").Append(opts.Fill).Append('"')
          .Append(" stroke=\"").Append(opts.Stroke).Append('"')
          .Append(" stroke-width=\"").Append(opts.StrokeWidthString).Append('"')
          .Append(" stroke-linecap=\"").Append(opts.StrokeLineCap).Append('"')
          .Append(" stroke-linejoin=\"").Append(opts.StrokeLineJoin).Append('"');

        if (!string.IsNullOrEmpty(opts.CssClass))
            sb.Append(" class=\"").Append(IconElement.XmlEscape(opts.CssClass)).Append('"');

        if (opts.Attributes != null)
        {
            foreach (var attr in opts.Attributes)
            {
                sb.Append(' ')
                  .Append(attr.Key)
                  .Append("=\"")
                  .Append(IconElement.XmlEscape(attr.Value))
                  .Append('"');
            }
        }

        sb.Append('>');

        var transform = opts.Transform?.ToSvgTransform();
        if (transform != null)
            sb.Append("<g transform=\"").Append(transform).Append("\">");

        for (var i = 0; i < icon.Elements.Count; i++)
        {
            sb.Append(icon.Elements[i].ToSvgString());
        }

        if (transform != null)
            sb.Append("</g>");

        sb.Append("</svg>");
        return sb.ToString();
    }
}
