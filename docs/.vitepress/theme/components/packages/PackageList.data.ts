import packageDataList from '../../../data/packageData.json';
import thirdPartyPackages from '../../../data/packageData.thirdParty.json';
import fetchPackages from '../../../lib/fetchPackages';

export default {
  async load() {
    const packageJsonList = await fetchPackages();

    return {
      packages: packageJsonList
        .filter((pJson) => pJson?.name != null && pJson.name in packageDataList)
        .map((pJson) => {
          const packageData = packageDataList[pJson.name];
          return {
            ...pJson,
            ...packageData,
            documentation: `/guide/${packageData.docsAlias ?? pJson.name}`,
            source: `https://github.com/lucide-icons/lucide/tree/main/packages/${packageData.packageDirname ?? pJson.name}`,
            icon: `/framework-logos/${packageData.icon}.svg`,
            iconDark: Boolean(packageData.iconDark)
              ? `/framework-logos/${packageData.iconDark}.svg`
              : null,
          };
        })
        .sort((a, b) => a.order - b.order),
      thirdPartyPackages,
    };
  },
};
