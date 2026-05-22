import base64SVG from '@lucide/build-icons/utils/base64SVG';
import { getHTMLBanner } from './license.mts';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';

export default defineExportTemplate(
  async ({ iconName, iconData, getSvg, deprecated, deprecationReason }) => {
    const svgContents = await getSvg();
    const svgBase64 = base64SVG(svgContents);

    return `\
<script lang="ts">
${getHTMLBanner()}
import Icon from '../Icon.svelte';
import type { LucideProps, LucideIconData } from '../types.js';

let props: LucideProps = $props();

const iconData: LucideIconData = ${JSON.stringify(iconData)};

</script>

<!--
@component

Lucide SVG icon component, renders SVG Element with children.

@preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
@see https://lucide.dev/guide/packages/lucide-svelte - Documentation
${deprecated ? `\n@deprecated ${deprecationReason}\n` : ''}\
-->

<Icon icon={iconData} {...props} />
`;
  },
);
