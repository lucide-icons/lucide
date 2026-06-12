import iconNodes from '../../../data/iconNodes';

const pickIcons = [
  'bot',
  'camera',
  'car',
  'cloud',
  'code',
  'coffee',
  'compass',
  'cpu',
  'disc',
  'droplet',
  'eye',
  'bug',
  'house',
  'heart-pulse',
  'clapperboard',
  'tool-case',
  'printer',
  'album',
  'pencil-ruler',
  'calendar',
  'brain',
  'audio-waveform',
  'bandage',
  'plane-takeoff',
  'ferris-wheel',
  'router',
  'file-box',
  'folder-tree',
  'banknote',
  'cake',
  'rocket',
  'picture-in-picture-2',
  'database',
  'messages-square',
  'map-pinned',
  'megaphone',
  'moon',
  'music',
  'phone',
  'power-off',
  'radio',
  'refresh-ccw',
  'repeat',
  'rss',
  'shield',
  'shopping-cart',
  'speakerphone',
  'star',
  'sun',
  'terminal',
  'thermometer',
  'thumbs-up',
  'trash-2',
  'umbrella',
  'watch',
  'sparkles',
  'wifi',
  'tent-tree',
  'traffic-cone',
  'tree-deciduous',
  'trophy',
  'tv',
  'windmill',
  'wrench',
  'satellite',
  'stethoscope',
];

export default {
  async load() {
    const icons = Object.entries(iconNodes).map(([name, iconNode]) => ({ name, iconNode }));

    const selectedIcons = icons.filter(({ name }) => pickIcons.includes(name)).reverse();

    const hasDuplicates =
      new Set(selectedIcons.map(({ name }) => name)).size !== selectedIcons.length;

    if (hasDuplicates) {
      throw new Error(
        `Duplicate icons found in the selected icons. Please check the pickIcons array and the iconNodes data for duplicates.`,
      );
    }

    if (selectedIcons.length !== 64) {
      throw new Error(
        `Expected to find 64 icons, but found ${selectedIcons.length}. Please check the pickIcons array and the iconNodes data.`,
      );
    }

    return {
      icons: selectedIcons,
      iconsCount: icons.length,
    };
  },
};
