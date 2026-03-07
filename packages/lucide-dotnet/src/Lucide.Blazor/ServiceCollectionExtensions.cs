using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Lucide.Blazor;

/// <summary>
/// Extension methods for registering Lucide icon services.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds Lucide icon services to the DI container.
    /// Registers <see cref="IIconProvider"/> and <see cref="ISvgRenderer"/>.
    /// </summary>
    public static IServiceCollection AddLucideIcons(this IServiceCollection services)
    {
        services.TryAddSingleton<IIconProvider, LucideIconProvider>();
        services.TryAddSingleton<ISvgRenderer, StringSvgRenderer>();
        return services;
    }

    /// <summary>
    /// Adds Lucide icon services with a custom icon provider configuration.
    /// </summary>
    public static IServiceCollection AddLucideIcons(
        this IServiceCollection services,
        Action<LucideIconProvider> configure)
    {
        services.AddSingleton<IIconProvider>(sp =>
        {
            var provider = new LucideIconProvider();
            configure(provider);
            return provider;
        });
        services.TryAddSingleton<ISvgRenderer, StringSvgRenderer>();
        return services;
    }
}
