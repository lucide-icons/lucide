import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path';
import grayMatter from 'gray-matter'

export default async function fetchAllDocuments() {
  const docsDir = path.resolve(process.cwd(), '../docs');
  const fileNames = await fs.readdir(docsDir)

  return (await Promise.all(
    fileNames
    .map(async (filename) => {
      const filePath = path.join(docsDir, filename);
      const isFile = (await fs.lstat(filePath)).isFile();

      if (!isFile) return null;

      const source = await fs.readFile(filePath, 'utf-8');

      const { content, data } = grayMatter(source)
      const doc = await serialize(content)

      return {
        filename,
        doc,
        data,
        content
      }
    })
  )).filter(Boolean)
}
