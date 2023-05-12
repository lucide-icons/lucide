import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path';
import grayMatter from 'gray-matter'

export default async function fetchAllDocuments() {
  const docsDir = path.resolve(process.cwd(), '../docs');
  const fileNames = await (await fs.readdir(docsDir)).map(filename => ({filename, directory: docsDir}))

  const mapDirectoryTree = async ({filename, directory}) => {
    const filePath = path.join(directory, filename);
    const fileStat = await fs.lstat(filePath);

    if(fileStat.isDirectory()) {
      const filenamesInDirectory =
        (await fs.readdir(filePath))
        .map(childFileName => ({
          directory: filePath,
          directoryName: filename,
          filename: childFileName
        }))

      return await Promise.all(filenamesInDirectory.map(mapDirectoryTree))
    }

    if (!fileStat.isFile()) return null;

    return {
      filePath,
      filename,
    }
  }

  const mapFileContents = async ({filename, filePath, directoryName = null}) => {
    const source = await fs.readFile(filePath, 'utf-8');

    const { content, data } = grayMatter(source)
    const doc = await serialize(content)

    return {
      filename,
      directoryName,
      doc,
      data,
      content
    }
  }

  const mappedDirectoryTree = (await Promise.all(fileNames.map(mapDirectoryTree))).flat()
    .filter((item) =>
      item != null
      && typeof item === 'object'
      && 'filename' in item
      && item.filename.endsWith('.md')
    )
  const mappedFileContents = await Promise.all(
    mappedDirectoryTree
    .map(mapFileContents)
  )

  return mappedFileContents
}
