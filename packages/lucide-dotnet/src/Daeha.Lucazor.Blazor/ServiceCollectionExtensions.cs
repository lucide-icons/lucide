using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Lucazor.Blazor;

/// <summary>
/// Extension methods for registering Lucazor icon services.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds Lucazor icon services to the DI container.
    /// Registers <see cref="IIconProvider"/> and <see cref="ISvgRenderer"/>.
    /// </summary>
    public static IServiceCollection AddLucazor(this IServiceCollection services)
    {
        services.TryAddSingleton<IIconProvider, LucazorIconProvider>();
        services.TryAddSingleton<ISvgRenderer, StringSvgRenderer>();
        return services;
    }

    /// <summary>
    /// Adds Lucazor icon services with a custom icon provider configuration.
    /// </summary>
    public static IServiceCollection AddLucazor(
        this IServiceCollection services,
        Action<LucazorIconProvider> configure)
    {
        services.AddSingleton<IIconProvider>(sp =>
        {
            var provider = new LucazorIconProvider();
            configure(provider);
            return provider;
        });
        services.TryAddSingleton<ISvgRenderer, StringSvgRenderer>();
        return services;
    }
}
