import {getAllData} from '../../../lib/icons';

export default async function handler(req, res) {
  const icons = await getAllData();
  res.status(200).json(icons.reduce((acc, icon, i) => {
    acc[icon.name] = icon.tags;
    return acc;
  }, {}));
}
