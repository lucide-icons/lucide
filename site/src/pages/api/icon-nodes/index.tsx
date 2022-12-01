import {getAllData} from '../../../lib/icons';
import { parseSync } from 'svgson';

export default async function handler(req, res) {
  const icons = await getAllData();
  res.status(200).json(icons.reduce((acc, icon, i) => {
    acc[icon.name] = parseSync(icon.src).children.map(({ name, attributes }) => [name, attributes]);
    return acc;
  }, {}));
}
