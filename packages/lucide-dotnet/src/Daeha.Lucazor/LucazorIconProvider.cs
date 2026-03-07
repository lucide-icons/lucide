using System.Collections.Concurrent;

namespace Lucazor;

/// <summary>
/// Default implementation of <see cref="IIconProvider"/> backed by the
/// generated <see cref="LucazorIcons"/> static class.
/// Supports registering custom icons alongside the built-in ones.
/// </summary>
public class LucazorIconProvider : IIconProvider
{
    private readonly ConcurrentDictionary<string, IconData> _customIcons
        = new ConcurrentDictionary<string, IconData>(StringComparer.OrdinalIgnoreCase);

    /// <inheritdoc/>
    public IconData? GetIcon(string name)
    {
        if (_customIcons.TryGetValue(name, out var custom))
            return custom;

        return LucazorIconRegistry.GetIcon(name);
    }

    /// <inheritdoc/>
    public IEnumerable<string> GetIconNames()
    {
        foreach (var name in _customIcons.Keys)
            yield return name;

        foreach (var name in LucazorIconRegistry.GetIconNames())
        {
            if (!_customIcons.ContainsKey(name))
                yield return name;
        }
    }

    /// <inheritdoc/>
    public int Count => LucazorIconRegistry.Count + _customIcons.Count;

    /// <summary>
    /// Registers a custom icon. Overrides any built-in icon with the same name.
    /// </summary>
    public void AddIcon(string name, IconData icon)
    {
        _customIcons[name] = icon ?? throw new ArgumentNullException(nameof(icon));
    }

    /// <summary>
    /// Removes a previously registered custom icon.
    /// </summary>
    public bool RemoveIcon(string name)
    {
        return _customIcons.TryRemove(name, out _);
    }
}
