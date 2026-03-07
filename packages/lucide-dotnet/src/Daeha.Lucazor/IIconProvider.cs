namespace Lucazor;

/// <summary>
/// Provides icon lookup by name.
/// </summary>
public interface IIconProvider
{
    /// <summary>Gets an icon by its kebab-case name. Returns null if not found.</summary>
    IconData? GetIcon(string name);

    /// <summary>Gets all available icon names.</summary>
    IEnumerable<string> GetIconNames();

    /// <summary>Gets the total number of available icons.</summary>
    int Count { get; }
}
