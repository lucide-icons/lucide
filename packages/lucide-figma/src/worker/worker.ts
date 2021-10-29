import { fetchIcons, LucideIcons } from "../api/fetchIcons"
import { createReactComponent } from 'lucide-react'
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

const getSvg = async ({ cachedIcons, iconName }: { cachedIcons: LucideIcons, iconName: string }) => {
  if (!cachedIcons) {
    return;
  }

  const iconNode = cachedIcons.iconNodes[iconName];

  if (iconNode) {
    const IconComponent = createReactComponent(iconName, iconNode)
    const svg = renderToString(createElement(IconComponent));

    parent.postMessage({ pluginMessage: {
      type: 'drawIcon',
      icon: { name, svg }
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

console.log('Hello world!')
