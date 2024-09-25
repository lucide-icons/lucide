import { BuildConfig } from '@lucide/build-icons/types/config'

export default {
  output: './src ',
  templateSrc: './scripts/exportTemplate.mjs',
  iconFileExtension: '.ts',
  aliases: {
    exportNamesOnly: true,
    fileExtension: '.ts',
  },
  indexFileName: 'index.ts'
} satisfies BuildConfig;
