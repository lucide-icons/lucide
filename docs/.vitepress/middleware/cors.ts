import { defineEventHandler, handleCors } from 'h3';

/**
 * In development the VitePress dev server and the Nitro API run on different ports, so requests
 * like `POST /api/waitlist` (JSON body → CORS preflight) are cross-origin. Answer the preflight and
 * add CORS headers in dev only; in production the docs and API share an origin.
 */
export default defineEventHandler((event) => {
  if (!import.meta.dev || !event.path.startsWith('/api/')) return;

  handleCors(event, {
    origin: '*',
    methods: '*',
    allowHeaders: '*',
  });
});
