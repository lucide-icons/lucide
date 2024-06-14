import iconMetaData from '../../data/iconMetaData';

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  return Object.fromEntries(Object.entries(iconMetaData).map(([name, { tags }]) => [name, tags]));
});
