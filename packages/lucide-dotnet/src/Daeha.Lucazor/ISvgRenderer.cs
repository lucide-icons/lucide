namespace Lucazor;

/// <summary>
/// Renders <see cref="IconData"/> to SVG string output.
/// </summary>
public interface ISvgRenderer
{
    /// <summary>
    /// Renders the icon data as a complete SVG string.
    /// </summary>
    string Render(IconData icon, SvgRenderOptions? options = null);
}
