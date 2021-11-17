import type { LucideIcons } from "./api/fetchIcons";
import filterIcons from "./helpers/filterIcons";

figma.showUI(__uiFiles__.worker, { visible: false })

let cachedIcons: LucideIcons

const setResults = ({result, query, lucideIcons} : { result: SuggestionResults, query: string, lucideIcons: LucideIcons }) => {
  const icons = Object.entries(lucideIcons.iconNodes);

  const suggestions = filterIcons(icons, lucideIcons.tags, query.toLowerCase()).map(([name]) => ({
    name,
    icon: lucideIcons.svgs[name]
  }))

  result.setSuggestions(suggestions)
}

figma.parameters.on('input', async ({ parameters, key, query, result }) => {
  if (key === 'icon-name') {
    console.log('typ tpy', query);
    cachedIcons = await figma.clientStorage.getAsync(`lucide-icons`)
    console.log('cachedIcons', cachedIcons);

    if(cachedIcons && cachedIcons.iconNodes && cachedIcons.tags) {
      setResults({result, query, lucideIcons: cachedIcons})
    }
  }
})

const drawIcon = ({icon: {name, svg}}: any) => {
  const min = 0
  const max = 100
  const randomPosition = () => Math.floor(Math.random() * (max - min + 1) + min)
  const icon = figma.createNodeFromSvg(svg)

  icon.name = name
  icon.x = Math.round(figma.viewport.center.x + randomPosition())
  icon.y = Math.round(figma.viewport.center.y + randomPosition())
  figma.currentPage.selection = [icon]

  // lock children
  icon.children.forEach((vectorNode, key) => {
    icon.children[key].locked = true
  });
}

const setCachedIcons = async (pluginMessage: any) => {
  if(pluginMessage.lucideIcons) {
    await figma.clientStorage.setAsync(`lucide-icons`, pluginMessage.lucideIcons)
  }
}

const getCachedIcons = async () => {
  cachedIcons = await figma.clientStorage.getAsync(`lucide-icons`)

  const response = { type: 'cachedIcons' }

  if(cachedIcons) {
    Object.assign(response, { cachedIcons })
  }

  figma.ui.postMessage(response)
}

getCachedIcons()

figma.ui.onmessage = (event) => {
  console.log(event, 'main');
  switch (event.type) {
    case "drawIcon":
      drawIcon(event)
      break;
    case "getCachedIcons":
      getCachedIcons()
      break;

    case "setCachedIcons":
      setCachedIcons(event)
      break;

    case "close":
      figma.closePlugin()
      break;

    default:
      break;
  }
}

figma.on('run', event => {
  if(event.parameters) {
    figma.ui.postMessage({ type: 'getSvg', iconName: event.parameters['icon-name'], cachedIcons })
  } else {
    figma.showUI(__uiFiles__.interface, { width: 300, height: 400 })
  }
})
