figma.showUI(__uiFiles__.worker, { visible: false })

figma.parameters.on('input', async ({ parameters, key, query, result }) => {
  switch (key) {
    case 'icon-name':
      figma.ui.postMessage({ type: 'iconListPls' })
      figma.ui.onmessage = message => {
        if (message.iconList) {
          result.setSuggestions(message.iconList.filter(s => s.includes(query)))
        }
      }
      break
    default:
      return
  }
})

figma.ui.onmessage = ({name, svg}) => {
  const icon = figma.createNodeFromSvg(svg)
  icon.name = name
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}

figma.on('run', event => {
  if(event?.parameters) {
    figma.ui.postMessage({ type: 'getIconList' })
    figma.ui.onmessage = ({name, svg}) => {
      const icon = figma.createNodeFromSvg(svg)
      icon.name = name
      icon.x = figma.viewport.center.x
      icon.y = figma.viewport.center.y
      figma.currentPage.selection = [icon]
    }
  } else {
    figma.showUI(__uiFiles__.interface, { width: 300, height: 400 })
  }
})

