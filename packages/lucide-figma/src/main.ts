import type { LucideIcons } from './api/fetchIcons';
import filterIcons from './helpers/filterIcons';

figma.showUI(__uiFiles__.worker, { visible: false });

let cachedIcons: LucideIcons;

type InsertableNodes = FrameNode | GroupNode;

function isInsertableNode(node: SceneNode): node is InsertableNodes {
  return ['FRAME', 'GROUP'].includes(node.type);
}

const setResults = ({
  result,
  query,
  lucideIcons,
}: {
  result: SuggestionResults;
  query: string;
  lucideIcons: LucideIcons;
}) => {
  const icons = Object.entries(lucideIcons.iconNodes);

  const suggestions = filterIcons(icons, lucideIcons.tags, query.toLowerCase()).map(([name]) => ({
    name,
    icon: lucideIcons.svgs[name],
  }));

  result.setSuggestions(suggestions);
};

// const styles = figma.getLocalPaintStyles();
// const styleNames = styles.map((style) => style.name);
// console.log(styleNames);

figma.parameters.on('input', async ({ parameters, key, query, result }) => {
  if (key === 'icon-name') {
    cachedIcons = await figma.clientStorage.getAsync(`lucide-icons`);

    if (cachedIcons && cachedIcons.iconNodes && cachedIcons.tags) {
      setResults({ result, query, lucideIcons: cachedIcons });
    }
  }
  if (key === 'size') {
    const iconSizes = [24, 36, 48, 72];
    result.setSuggestions(
      iconSizes.map((size) => ({
        name: size.toString(),
        data: size,
      })),
    );
  }
});

const drawIcon = ({ icon: { name, svg, size } }: any) => {
  const min = 0;
  const max = 100;
  const randomPosition = () => Math.floor(Math.random() * (max - min + 1) + min);

  const icon = figma.createNodeFromSvg(svg);
  icon.setPluginData('isLucideIcon', 'true');
  icon.setPluginData('iconName', name);

  const pluginData = icon.getPluginData('isLucideIcon');

  icon.name = name;
  icon.x = Math.round(figma.viewport.center.x + randomPosition());
  icon.y = Math.round(figma.viewport.center.y + randomPosition());

  if (figma.currentPage.selection.length) {
    let currentSelection = figma.currentPage.selection[0];
    const isLucideIcon = currentSelection.getPluginData('isLucideIcon');

    // if(isLucideIcon && currentSelection?.parent) {
    //   return
    //   // currentSelection = currentSelection.parent as SceneNode
    // }

    if (!isLucideIcon && isInsertableNode(currentSelection)) {
      icon.x = currentSelection.type === 'GROUP' ? currentSelection.x : 0;
      icon.y = currentSelection.type === 'GROUP' ? currentSelection.y : 0;

      currentSelection.appendChild(icon);
    }
  }

  figma.currentPage.selection = [icon];

  // lock children
  // icon.children.forEach((vectorNode, key) => {
  //   icon.children[key].locked = true
  // });
};

const setCachedIcons = async (pluginMessage: any) => {
  if (pluginMessage.lucideIcons) {
    await figma.clientStorage.setAsync(`lucide-icons`, pluginMessage.lucideIcons);
  }
};

const getCachedIcons = async () => {
  cachedIcons = await figma.clientStorage.getAsync(`lucide-icons`);

  const response = { type: 'cachedIcons' };

  if (cachedIcons) {
    Object.assign(response, { cachedIcons });
  }

  figma.ui.postMessage(response);
};

getCachedIcons();

figma.ui.onmessage = (event) => {
  switch (event.type) {
    case 'drawIcon':
      drawIcon(event);
      break;
    case 'getCachedIcons':
      getCachedIcons();
      break;

    case 'setCachedIcons':
      setCachedIcons(event);
      break;

    case 'close':
      figma.closePlugin();
      break;

    default:
      break;
  }
};

figma.on('run', (event) => {
  if (event.parameters) {
    figma.ui.postMessage({
      type: 'getSvg',
      iconName: event.parameters['icon-name'],
      size: event.parameters['size'],
      cachedIcons,
    });
  } else {
    figma.showUI(__uiFiles__.interface, { width: 300, height: 400 });
  }
});
