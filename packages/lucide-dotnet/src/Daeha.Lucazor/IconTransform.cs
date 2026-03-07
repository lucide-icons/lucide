namespace Lucazor;

/// <summary>
/// Describes a visual transform applied to an icon (rotation, flip).
/// </summary>
public class IconTransform
{
    /// <summary>Rotation in degrees (0, 90, 180, 270).</summary>
    public int Rotate { get; set; }

    /// <summary>Flip horizontally.</summary>
    public bool FlipX { get; set; }

    /// <summary>Flip vertically.</summary>
    public bool FlipY { get; set; }

    /// <summary>No transform.</summary>
    public static IconTransform None { get; } = new();

    /// <summary>Rotate 90 degrees clockwise.</summary>
    public static IconTransform Rotate90 { get; } = new() { Rotate = 90 };

    /// <summary>Rotate 180 degrees.</summary>
    public static IconTransform Rotate180 { get; } = new() { Rotate = 180 };

    /// <summary>Rotate 270 degrees clockwise.</summary>
    public static IconTransform Rotate270 { get; } = new() { Rotate = 270 };

    /// <summary>Flip horizontally.</summary>
    public static IconTransform FlipHorizontal { get; } = new() { FlipX = true };

    /// <summary>Flip vertically.</summary>
    public static IconTransform FlipVertical { get; } = new() { FlipY = true };

    /// <summary>Returns the SVG transform attribute value, or null if no transform.</summary>
    internal string? ToSvgTransform()
    {
        var parts = new List<string>();

        if (Rotate != 0)
            parts.Add($"rotate({Rotate} 12 12)");

        if (FlipX && FlipY)
            parts.Add("scale(-1 -1) translate(-24 -24)");
        else if (FlipX)
            parts.Add("scale(-1 1) translate(-24 0)");
        else if (FlipY)
            parts.Add("scale(1 -1) translate(0 -24)");

        return parts.Count > 0 ? string.Join(" ", parts) : null;
    }
}
