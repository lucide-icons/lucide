figma.showUI(__uiFiles__.worker, { width: 300, height: 400 })
figma.showUI(__uiFiles__.interface, { width: 300, height: 400 })

figma.parameters.on('input', async ({ parameters, key, query, result }) => {
  if (key === 'icon-name') {
    figma.ui.postMessage({ type: 'getIconList' })
    figma.ui.onmessage = message => {
      if (message.iconList) {
        result.setSuggestions(message.iconList.filter(s => s.includes(query)))
      }
    }
  }
})

const drawIcon = ({name, svg}) => {
  const icon = figma.createNodeFromSvg(svg)
  icon.name = name
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}

figma.ui.onmessage = (event) => {
  console.log(event, 'main');

  if (event?.data?.pluginMessage?.type === "drawIcon") {
    drawIcon(event)
  }
}

figma.on('run', event => {
  if(event?.parameters) {
    figma.ui.postMessage({ type: 'getIconList' })
  }
})

