using System.Collections.Concurrent;

namespace Lucazor;

/// <summary>
/// Registry for looking up icons by their kebab-case name at runtime.
/// Icons are automatically registered on first access.
/// </summary>
public static class LucazorIconRegistry
{
    private static readonly ConcurrentDictionary<string, IconData> Icons
        = new ConcurrentDictionary<string, IconData>(StringComparer.OrdinalIgnoreCase);

    private static volatile bool _initialized;

    internal static void Register(string name, IconData data)
    {
        Icons[name] = data;
    }

    /// <summary>
    /// Ensures all icons are registered. Called automatically on first lookup.
    /// </summary>
    private static void EnsureInitialized()
    {
        if (_initialized) return;
        LucazorIcons.RegisterAll();
        _initialized = true;
    }

    /// <summary>
    /// Gets an icon by its kebab-case name (e.g., "arrow-right", "activity").
    /// Returns null if the icon is not found.
    /// </summary>
    public static IconData? GetIcon(string name)
    {
        EnsureInitialized();
        Icons.TryGetValue(name, out var data);
        return data;
    }

    /// <summary>
    /// Gets all registered icon names.
    /// </summary>
    public static IEnumerable<string> GetIconNames()
    {
        EnsureInitialized();
        return Icons.Keys;
    }

    /// <summary>
    /// Gets the total number of registered icons.
    /// </summary>
    public static int Count
    {
        get
        {
            EnsureInitialized();
            return Icons.Count;
        }
    }
}
