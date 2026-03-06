using System.Collections.Concurrent;

namespace Lucide;

/// <summary>
/// Registry to look up icons by their kebab-case name at runtime.
/// </summary>
public static class LucideIconRegistry
{
    private static readonly ConcurrentDictionary<string, IconData> Icons = new(StringComparer.OrdinalIgnoreCase);

    internal static void Register(string name, IconData data)
    {
        Icons[name] = data;
    }

    /// <summary>
    /// Get an icon by its kebab-case name (e.g., "arrow-right", "activity").
    /// </summary>
    public static IconData? GetIcon(string name)
    {
        Icons.TryGetValue(name, out var data);
        return data;
    }

    /// <summary>
    /// Get all registered icon names.
    /// </summary>
    public static IEnumerable<string> GetIconNames() => Icons.Keys;

    /// <summary>
    /// Total number of registered icons.
    /// </summary>
    public static int Count => Icons.Count;
}
