figma.showUI(__html__, { width: 300, height: 400 })

figma.ui.onmessage = ({name, svg}) => {
  const icon = figma.createNodeFromSvg(svg)
  icon.name = name
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}
