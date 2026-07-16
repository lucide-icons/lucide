import iconMetaData from '../../../data/iconMetaData';

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  for (const iconDetail in iconMetaData) {
    // Remove $schema from the response
    delete iconMetaData[iconDetail]['$schema']
  }

  return iconMetaData;
});
