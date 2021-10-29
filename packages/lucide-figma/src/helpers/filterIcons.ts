import { Tags } from "../api/fetchIcons";
import { Icon } from "../hooks/useSearch";

export default (icons: Icon[], tags: Tags ,query:string) =>
  icons.filter(([name]: Icon) => [name, ...(tags?.[name] || [])].some(
    (item:string) => item
      .toLowerCase()
      .includes(query)
    ))
