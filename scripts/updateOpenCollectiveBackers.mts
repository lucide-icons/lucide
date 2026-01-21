import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

function updateOpenCollectiveBackers() {
  const packagesPath = join(import.meta.dirname, '../packages');
  const mainReadme = readFileSync(join(import.meta.dirname, '../README.md'), 'utf8');
  const awesomeRegex = /(\[\/\/]: <> \(Open Collective backers\).+)$/s;
  const awesomeBlock = awesomeRegex.exec(mainReadme);
  if (awesomeBlock?.[1]) {
    const packageAwesomeBlock = awesomeBlock[1].replaceAll('src="docs/public/sponsors', 'src="https://lucide.dev/sponsors')
    readdirSync(packagesPath).forEach((packagePath) => {
      if (['lucide-figma', 'shared'].includes(packagePath) || packagePath.startsWith('.')) {
        return;
      }
      const readmePath = join(packagesPath, packagePath, 'README.md');
      if (existsSync(readmePath)) {
        const readmeContent = readFileSync(readmePath, 'utf8');
        if (awesomeRegex.test(readmeContent)) {
          writeFileSync(readmePath, readmeContent.replace(awesomeRegex, packageAwesomeBlock));
          console.log(`Upgraded Awesome backers block in ${readmePath}`);
        } else {
          console.error(`Could not find Awesome backers block in ${readmePath}`)
        }
      } else {
        console.warn(`No readme found at ${readmePath}`);
      }
    })
  } else {
    console.error('Could not identify Awesome backers block')
  }
}

updateOpenCollectiveBackers();
