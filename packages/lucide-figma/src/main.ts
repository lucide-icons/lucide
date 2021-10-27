// figma.showUI(__uiFiles__.worker, { visible: false })
figma.showUI(__uiFiles__.worker, { visible: false })

figma.parameters.on('input', async ({ parameters, key, query, result }) => {
  if (key === 'icon-name') {
    figma.ui.postMessage({ type: 'getIconList' })
    figma.ui.onmessage = message => {
      if (message.iconList) {
        result.setSuggestions(message.iconList.filter((s:any) => s.includes(query)))
      }
    }
  }
})

const drawIcon = ({name, svg}: any) => {
  const icon = figma.createNodeFromSvg(svg)
  // icon.name = name
  // icon.x = figma.viewport.center.x
  // icon.y = figma.viewport.center.y
  // figma.currentPage.selection = [icon]
}

const getCachedIcons = async (pluginMessage: any) => {
  // if(pluginMessage?.version) {
  //   const { version } = pluginMessage
  //   const icons = await figma.clientStorage.getAsync(`lucide-icons@${version}`)
  //   figma.ui.postMessage({ type: 'cachedIcons', icons })
  // }
}

figma.ui.onmessage = (event) => {
  console.log(event, 'main');
  // switch (event.type) {
  //   case "drawIcon":
  //     drawIcon(event)
  //     break;
  //   case "getCachedIcons":
  //     getCachedIcons(event)
  //     break;

  //   default:
  //     break;
  // }
}

figma.on('run', event => {
  figma.ui.postMessage({ type: 'fetchIcons' })

  if(!event.parameters) {
    figma.showUI(__uiFiles__.interface, { width: 300, height: 400 })
  }
})
