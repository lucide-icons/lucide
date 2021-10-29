import iconNodeToSvg from "../helpers/iconNodeToSvg"

export type IconNode = any[]
export type IconName = string

export type Tag = string[]
export interface Tags {
  [key:string]: Tag
}

export interface LucideIcons {
  version: string
  iconNodes: { [key: IconName]: IconNode }
  tags: Tags,
  svgs: { [key: IconName]: string }
}

export const fetchIcons = async (cachedIcons? : LucideIcons): Promise<LucideIcons> => {
  const response = await fetch('https://unpkg.com/lucide-static@latest/package.json')
  const packageJson = await response.json();

  if(cachedIcons && cachedIcons?.version === packageJson.version) {
    return cachedIcons
  }

  const iconNodesResponse = await fetch(`https://unpkg.com/lucide-static@${packageJson.version}/icon-nodes.json`)
  const tagsResponse = await fetch('https://unpkg.com/lucide-static@latest/tags.json')

  const iconNodes = await iconNodesResponse.json();
  const tags = await tagsResponse.json();
  const svgs = Object.keys(iconNodes).reduce((acc : { [key:string]: string}, iconName) => {
    acc[iconName] = iconNodeToSvg(iconName, iconNodes[iconName])
    return acc
  }, {})

  const lucideIcons: LucideIcons = {
    version: packageJson.version,
    tags,
    iconNodes,
    svgs
  }

  parent.postMessage({
    pluginMessage: {
      type: "setCachedIcons",
      lucideIcons
    }
  }, "*")

  return lucideIcons
}

export const getIcons = () => new Promise<LucideIcons>(async (resolve, reject)=> {

  parent.postMessage({
    pluginMessage: {
      type: "getCachedIcons",
    }
  }, "*")

  window.onmessage = async (event) => {
    if (event.type === 'message' && event?.data?.pluginMessage.type === 'cachedIcons') {

      const lucideIcons = await fetchIcons(event?.data?.pluginMessage?.cachedIcons)
      resolve(lucideIcons)
    }
  }
});
