import packageData from '../../../data/packageData.json';
import thirdPartyPackages from '../../../data/packageData.thirdParty.json';
import fetchPackages from "../../../lib/fetchPackages";

export default {
  async load() {
    const packages = await fetchPackages();
    return {
      packages: packages
        .filter(p => p.name in packageData)
        .map((pData) => ({
        ...pData,
        ...packageData[pData.name],
        icon: `/framework-logos/${packageData[pData.name].icon}.svg`,
      })).sort((a, b) => a.order - b.order),
      thirdPartyPackages,
    };
  }
}
