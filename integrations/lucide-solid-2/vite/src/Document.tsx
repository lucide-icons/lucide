import { HydrationScript } from '@solidjs/web';
import type { ParentProps } from 'solid-js';

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Lucide Solid 2 Vite integration</title>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
