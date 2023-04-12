import { createLucideIcon, LucideProps } from "lucide-react"
import { IconEntity } from "src/types"
import { renderToStaticMarkup } from 'react-dom/server';
import { IconContent } from "./generateZip";

const getFallbackZip = (icons: IconEntity[], params: LucideProps) => {
  return icons
    .map<IconContent>((icon) => {
      const Icon = createLucideIcon(icon.name, icon.iconNode)
      const src = renderToStaticMarkup(<Icon {...params} />)
      return [icon.name, src]
    })
}


export default getFallbackZip
