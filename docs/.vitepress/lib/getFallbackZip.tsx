import { createLucideIcon } from 'lucide-react/src/lucide-react';
import { type LucideProps, type IconNode } from 'lucide-react/src/types';
import { IconEntity } from '../theme/types';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconContent } from './generateZip';

const getFallbackZip = (icons: IconEntity[], params: LucideProps) => {
  return icons.map<IconContent>((icon) => {
    const Icon = createLucideIcon(icon.name, icon.iconNode as IconNode);
    const src = renderToStaticMarkup(<Icon {...params} />);
    return [icon.name, src];
  });
};

export default getFallbackZip;
