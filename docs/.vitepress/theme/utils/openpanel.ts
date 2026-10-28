import { OpenPanel } from '@openpanel/web';

const clientId = import.meta.env.VITE_OPENPANEL_CLIENT_ID;

/**
 * Shared OpenPanel instance, only created in the browser and when a client ID is configured.
 * Page views are tracked from the VitePress router (see theme/index.ts) instead of
 * `trackScreenViews`, so the page title is already updated when the event is sent.
 */
export const op =
  !import.meta.env.SSR && clientId
    ? new OpenPanel({
        clientId,
        apiUrl: 'https://insights.lucide.dev/api',
        trackScreenViews: false,
        trackOutgoingLinks: false,
        trackAttributes: false,
      })
    : undefined;
