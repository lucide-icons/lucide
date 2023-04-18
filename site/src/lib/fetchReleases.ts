import * as lucidePackage from '../../../packages/lucide/package.json'

export const fetchCurrentRelease = async () => {
  return `v${lucidePackage.version}`;
};
