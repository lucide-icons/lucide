import iconMetaData from '../../../data/iconMetaData';
import iconNodes from '../../../data/iconNodes';

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  const iconDetails = iconMetaData

  for (const iconName in iconMetaData) {
    // Remove $schema from the response
    delete iconDetails[iconName]['$schema']

    // Add details from iconNodes
    iconDetails[iconName]['name'] = iconName
    iconDetails[iconName]['iconNode'] = iconNodes[iconName];
  }

  return iconMetaData;
});
