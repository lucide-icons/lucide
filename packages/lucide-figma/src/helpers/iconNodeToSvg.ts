import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { IconNode } from "../api/fetchIcons";
import createIconComponent from "./createIconComponent";

const iconNodeToSvg = (iconName: string, iconNode : IconNode) => {
  const IconComponent = createIconComponent(iconName, iconNode)
  return  renderToString(createElement(IconComponent));
}

export default iconNodeToSvg
