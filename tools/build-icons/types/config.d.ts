interface AliasConfig {
  exportNamesOnly: boolean,
  fileExtension: string
}

export interface BuildConfig {
  output: string
  templateSrc: string
  iconFileExtension?: string
  aliases?: AliasConfig | boolean
  indexFileName?: string
}
