using System.Globalization;
using Microsoft.AspNetCore.Components;

namespace Lucazor.Blazor;

public partial class LucazorIcon : ComponentBase
{
    /// <summary>
    /// The icon data to render. Use LucazorIcons.IconName (e.g., LucazorIcons.Activity).
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
    /// Additional CSS class for the SVG element.
    /// </summary>
    [Parameter]
    public string? CssClass { get; set; }

    /// <summary>
    /// Transform to apply (rotation, flip).
    /// </summary>
    [Parameter]
    public IconTransform? Transform { get; set; }

    /// <summary>
    /// Any additional HTML attributes to apply to the SVG element.
    /// </summary>
    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object>? AdditionalAttributes { get; set; }

    [Inject]
    private IIconProvider? IconProvider { get; set; }

    private IconData? _icon;

    internal string StrokeWidthString =>
        StrokeWidth.ToString(CultureInfo.InvariantCulture);

    internal string? SvgTransform =>
        Transform?.ToSvgTransform();

    protected override void OnParametersSet()
    {
        _icon = Icon ?? ResolveByName(Name);
    }

    private IconData? ResolveByName(string? name)
    {
        if (string.IsNullOrEmpty(name))
            return null;

        if (IconProvider != null)
            return IconProvider.GetIcon(name);

        return LucazorIconRegistry.GetIcon(name);
    }
}
