import { eventHandler, setResponseHeader } from 'h3';
import iconMetaData from '../../../data/lab/iconMetaData';
import iconPopularity from '../../../data/lab/iconPopularity';
import iconNodes from '../../../data/lab/iconNodes';

export default eventHandler((event) => {
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  return Object.fromEntries(
    Object.entries(iconMetaData).map(([iconName, iconData]) => {
      // Remove $schema from the response
      delete iconData['$schema'];

      return [
        iconName,
        {
          name: iconName,
          iconNode: iconNodes[iconName],
          popularity: iconPopularity[iconName]?.count ?? 0,
          ...iconData,
        },
      ];
    }),
  );
});
