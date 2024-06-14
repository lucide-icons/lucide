import { Tags } from '../api/fetchIcons';
import { Icon } from '../hooks/useSearch';

export default (icons: Icon[], tags: Tags, query: string) =>
  icons.filter(([name]: Icon) => {
    const iconTags = tags && tags[name] ? tags[name] : [];

    return [name, ...iconTags].some((item: string) => item.toLowerCase().includes(query));
  });
