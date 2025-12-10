import { eventHandler, setResponseHeader } from 'h3';
import releaseMeta from '../../data/releaseMetaData.json';

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  return Object.fromEntries(
    Object.entries(releaseMeta).map(
      ([name, { createdRelease }]) => [name, createdRelease.version]
    )
  );
});
