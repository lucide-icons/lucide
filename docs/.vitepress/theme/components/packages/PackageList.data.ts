import packageData from '../../../data/packageData.json';
import thirdPartyPackages from '../../../data/packageData.thirdParty.json';
import fetchPackages from '../../../lib/fetchPackages';

export default {
  async load() {
    const packages = await fetchPackages();

    return {
      packages: packages
        .filter((p) => p?.name != null && p.name in packageData)
        .map((pData) => ({
          ...pData,
          ...packageData[pData.name],
          documentation: `/guide/packages/${pData.name}`,
          source: `https://github.com/lucide-icons/lucide/tree/main/packages/${pData.name}`,
          icon: `/framework-logos/${packageData[pData.name].icon}.svg`,
          iconDark: Boolean(packageData[pData.name].iconDark)
            ? `/framework-logos/${packageData[pData.name].iconDark}.svg`
            : null,
        }))
        .sort((a, b) => a.order - b.order),
      thirdPartyPackages,
    };
  },
};
