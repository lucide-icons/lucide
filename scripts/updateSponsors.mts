import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

function updateSponsors() {
  const packagesPath = join(import.meta.dirname, '../packages');
  const mainReadme = readFileSync(join(import.meta.dirname, '../README.md'), 'utf8');
  const sponsorsRegex = /(\[\/\/]: <> \(Sponsors\).+)$/s;
  const sponsorsBlock = sponsorsRegex.exec(mainReadme);
  if (sponsorsBlock?.[1]) {
    const packageSponsorsBlock = sponsorsBlock[1].replaceAll('src="docs/public', 'src="https://lucide.dev')
    readdirSync(packagesPath).forEach((packagePath) => {
      if (['lucide-figma', 'shared'].includes(packagePath) || packagePath.startsWith('.')) {
        return;
      }
      const readmePath = join(packagesPath, packagePath, 'README.md');
      if (existsSync(readmePath)) {
        const readmeContent = readFileSync(readmePath, 'utf8');
        if (sponsorsRegex.test(readmeContent)) {
          writeFileSync(readmePath, readmeContent.replace(sponsorsRegex, packageSponsorsBlock));
          console.log(`Upgraded Sponsors block in ${readmePath}`);
        } else {
          console.error(`Could not find Sponsors block in ${readmePath}`)
        }
      } else {
        console.warn(`No readme found at ${readmePath}`);
      }
    })
  } else {
    console.error('Could not identify Sponsors block')
  }
}

updateSponsors();
