<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Use Lucide in Node.js

You can also import Lucide icons in Node.js projects, with the lucide-static package.
Each icon is exported as a string containing the SVG markup, which can be used in server-side rendering or static site generation.

::: code-group

```js [ESM]
import {MessageSquare} from 'lucide-static';
```

```js [CommonJs]
const {MessageSquare} = require('lucide-static');
```

:::

> Note: Each icon name is in PascalCase. You can find the icon names in the [Lucide Icons page](https://lucide.dev/icons).


## Example with Node.js

::: sandpack {template=node showTabs=false editorHeight=480 editorWidthPercentage=60 dependencies="lucide-static"}

```js /index.js [active]
import http from 'http';
import { MessageSquare } from 'lucide-static';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  res.end(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Lucide Icons</h1>
        <p>This is a Lucide icon ${MessageSquare}</p>

      </body>
    </html>
  `);
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

:::
