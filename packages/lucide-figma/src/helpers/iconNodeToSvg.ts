import { createReactComponent } from '../../../lucide-react'
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { IconNode } from "../api/fetchIcons";

const iconNodeToSvg = (iconName: string, iconNode : IconNode) => {
  const IconComponent = createReactComponent(iconName, iconNode)
  return  renderToString(createElement(IconComponent));
}

export default iconNodeToSvg
