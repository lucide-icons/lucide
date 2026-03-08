import path from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

for (const file of readdirSync(path.join(import.meta.dirname, '../docs/images'))) {
  if (!file.endsWith('.svg')) continue;
  const fileName = path.join(import.meta.dirname, '../docs/images', file);
  const oldFileContent = readFileSync(fileName, 'utf8');
  const newFileContent = oldFileContent
    .split('</g>')
    .map((val) =>
      val.replace(
        /(<g id="embed-lucide-([^"]*).*>)(.|\n)*/gm,
        (_, groupOpeningTag, iconName) =>
          [
            groupOpeningTag,
            ...readFileSync(path.join(import.meta.dirname, `../icons/${iconName}.svg`), 'utf8')
              .replace(/(<svg)([^>]|\n)*>|<\/svg>/g, '')
              .split('\n'),
          ]
            .map((val) => val.trimEnd())
            .filter(Boolean)
            .join('\n') + '\n',
      ),
    )
    .join('</g>');
  if (oldFileContent !== newFileContent) {
    console.log(`Updating ${fileName}`);
    writeFileSync(fileName, newFileContent);
  }
}
