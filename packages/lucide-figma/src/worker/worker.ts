import { fetchIcons, LucideIcons } from "../api/fetchIcons"
import createIconComponent from "../helpers/createIconComponent"
import { renderToString } from 'react-dom/server'
import { createElement } from "react"

const getLatestIcons = async ({ cachedIcons }: any) => {
  const lucideIcons = await fetchIcons(cachedIcons)

  parent.postMessage({
    pluginMessage: {
      type: "latestIcons",
      lucideIcons,
    }
  }, "*")
}

const getSvg = async ({ cachedIcons, iconName, size = 24 }: { cachedIcons: LucideIcons, iconName: string, size: number }) => {
  if (!cachedIcons) {
    return;
  }

  console.log( iconName, size)

  const iconNode = cachedIcons.iconNodes[iconName];

  if (iconNode) {
    const IconComponent = createIconComponent(iconName, iconNode)
    const svg = renderToString(createElement(IconComponent, { size }));

    parent.postMessage({ pluginMessage: {
      type: 'drawIcon',
      icon: {
        name: iconName,
        svg,
        size
      }
    }}, '*')

    parent.postMessage({ pluginMessage: {
      type: 'close',
    }}, '*')
  }
}

window.onmessage = async (event) => {
  if (!event?.data?.pluginMessage) {
    return
  }

  const { pluginMessage } = event.data

  switch (pluginMessage.type) {
    case "getLatestIcons":
      getLatestIcons(pluginMessage)
      break;

    case "getSvg":
      getSvg(pluginMessage)
      break;

    default:
      break;
  }
}
