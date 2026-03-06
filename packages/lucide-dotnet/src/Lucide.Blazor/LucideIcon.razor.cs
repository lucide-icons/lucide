using Microsoft.AspNetCore.Components;

namespace Lucide.Blazor;

public partial class LucideIcon : ComponentBase
{
    /// <summary>
    /// The icon data to render. Use LucideIcons.IconName (e.g., LucideIcons.Activity).
    /// Takes priority over <see cref="Name"/>.
    /// </summary>
    [Parameter]
    public IconData? Icon { get; set; }

    /// <summary>
    /// The icon name for dynamic lookup (e.g., "activity", "arrow-right").
    /// Used only when <see cref="Icon"/> is not set.
    /// </summary>
    [Parameter]
    public string? Name { get; set; }

    /// <summary>
    /// Icon size in pixels. Default is 24.
    /// </summary>
    [Parameter]
    public int Size { get; set; } = 24;

    /// <summary>
    /// Stroke color. Default is "currentColor".
    /// </summary>
    [Parameter]
    public string Color { get; set; } = "currentColor";

    /// <summary>
    /// Fill color. Default is "none".
    /// </summary>
    [Parameter]
    public string Fill { get; set; } = "none";

    /// <summary>
    /// Stroke width. Default is 2.
    /// </summary>
    [Parameter]
    public float StrokeWidth { get; set; } = 2f;

    /// <summary>
    /// Additional CSS class.
    /// </summary>
    [Parameter]
    public string? CssClass { get; set; }

    /// <summary>
    /// Any additional HTML attributes to apply to the SVG element.
    /// </summary>
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object>? AdditionalAttributes { get; set; }

    private IconData? _icon;

    protected override void OnParametersSet()
    {
        _icon = Icon ?? ResolveByName(Name);
    }

    private static IconData? ResolveByName(string? name)
    {
        if (string.IsNullOrEmpty(name))
            return null;

        return LucideIconRegistry.GetIcon(name);
    }
}
