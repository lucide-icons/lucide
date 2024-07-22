import type { UserConfig } from '@commitlint/types';
import fs from 'fs/promises'
import path from 'path'

// Read directory
const getAllPackageFromDirectory = async (directory: string) => {
  return fs.readdir(path.resolve(process.cwd(), directory))
}

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': async () => {
      const packages = await getAllPackageFromDirectory('packages')
      const toolPackages = await getAllPackageFromDirectory('tools')

      return [2, 'always', [
          'site',
          'meta',
          ...packages,
          ...toolPackages,
        ]
      ]
    }
  },
};

export default Configuration;
