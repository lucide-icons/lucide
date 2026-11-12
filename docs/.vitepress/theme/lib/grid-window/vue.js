/**
 * @grid-window/vue — Vue 3 adapter.
 *
 * Vue renders the children; the core only decides which ones exist. The root
 * element of the default slot is the grid item itself, there is no wrapper.
 *
 *   <VirtualGrid class="grid" :count="icons.length" :sections="sections">
 *     <template #default="{ index }"><Icon :icon="icons[index]" /></template>
 *     <template #section="{ section }">{{ section.title }}</template>
 *     <template #block="{ block }"><Card v-bind="block" /></template>
 *   </VirtualGrid>
 */
import { defineComponent, Fragment, h, onBeforeUnmount, onMounted, shallowRef, watch, } from 'vue';
import { virtualGrid } from './core.js';
const EMPTY = { cells: [], blocks: [], pending: false };
/** Everything the layout depends on. */
const signature = (count, sections = [], blocks = []) => JSON.stringify([
    count,
    sections.map((s) => [s.index, s.rows]),
    blocks.map((b) => [b.section, b.row, b.column, b.columns, b.rows, b.minColumns]),
]);
export const VirtualGrid = defineComponent({
    name: 'VirtualGrid',
    props: {
        /** Total number of items. */
        count: { type: Number, required: true },
        sections: Array,
        blocks: Array,
        /** Row height in px. Default: the stylesheet's `grid-auto-rows`, else measured. */
        rowHeight: Number,
        /** Extra rows rendered above and below the viewport. Default: 4. */
        overscan: Number,
        /** Scroll container. Default: nearest scrollable ancestor, else the window. */
        scroller: Object,
        /** Element to render the grid as. */
        tag: { type: String, default: 'div' },
    },
    emits: {
        /** The rendered item range changed. */
        range: (_start, _end) => true,
    },
    slots: Object,
    setup(props, { slots, emit, expose }) {
        const el = shallowRef();
        const view = shallowRef(EMPTY);
        let core;
        onMounted(() => {
            core = virtualGrid(el.value, {
                count: props.count,
                sections: props.sections,
                blocks: props.blocks,
                rowHeight: props.rowHeight,
                overscan: props.overscan,
                scroller: props.scroller,
                onRange: (start, end) => emit('range', start, end),
                // Vue flushes in a microtask, which still runs before the browser
                // paints the frame the scroll event belongs to.
                onView: (next) => (view.value = next),
            });
        });
        onBeforeUnmount(() => core?.destroy());
        watch(() => signature(props.count, props.sections, props.blocks), () => core?.update({ count: props.count, sections: props.sections, blocks: props.blocks }), { flush: 'post' });
        // The single item is rendered: measure it.
        watch(view, (v) => v.pending && core?.refresh(), { flush: 'post' });
        expose({
            get range() {
                return core?.range ?? [0, 0];
            },
            get columns() {
                return core?.columns ?? 0;
            },
            scrollTo: (index, options) => core?.scrollTo(index, options),
            scrollToSection: (section, options) => core?.scrollToSection(section, options),
            refresh: () => core?.refresh(),
        });
        return () => {
            const children = [];
            for (const cell of view.value.cells) {
                if (cell.type === 'item') {
                    if (cell.index < props.count) {
                        children.push(h(Fragment, { key: cell.index }, slots.default?.({ index: cell.index })));
                    }
                }
                else {
                    const section = props.sections?.[cell.section];
                    if (section) {
                        children.push(h('div', { key: 's' + cell.section, class: section.class, style: cell.style }, slots.section?.({ section, index: cell.section })));
                    }
                }
            }
            for (const { block: index, style } of view.value.blocks) {
                const block = props.blocks?.[index];
                if (block) {
                    children.push(h('div', { key: 'b' + index, class: block.class, style }, slots.block?.({ block, index })));
                }
            }
            return h(props.tag, { ref: el }, children);
        };
    },
});
