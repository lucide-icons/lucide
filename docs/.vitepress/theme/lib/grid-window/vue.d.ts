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
import { type PropType, type SlotsType, type VNode } from 'vue';
import { type ScrollToOptions } from './core.js';
export interface VirtualGridSection {
    /** The header sits before item `index`; that item starts a new row. */
    index: number;
    /** Height of the header in rows. Default: 1. */
    rows?: number;
    /** Class for the header's element. */
    class?: unknown;
    /** Anything else you want to read in the `#section` slot. */
    [key: string]: unknown;
}
export interface VirtualGridBlock {
    /** Position in `sections` of the section this block belongs to. Default: 0. */
    section?: number;
    /** First row, 0-based, counted from below the section's header. */
    row: number;
    /** First column, 0-based; negative counts from the right (`-1` = flush right). */
    column?: number;
    columns: number;
    rows: number;
    /** Full width when the grid has fewer columns than this. Default: `columns + 2`. */
    minColumns?: number;
    /** Class for the block's element. */
    class?: unknown;
    /** Anything else you want to read in the `#block` slot. */
    [key: string]: unknown;
}
export interface VirtualGridExposed {
    readonly range: readonly [start: number, end: number];
    readonly columns: number;
    scrollTo(index: number, options?: ScrollToOptions): void;
    scrollToSection(section: number, options?: ScrollToOptions): void;
    refresh(): void;
}
export declare const VirtualGrid: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /** Total number of items. */
    count: {
        type: NumberConstructor;
        required: true;
    };
    sections: PropType<VirtualGridSection[]>;
    blocks: PropType<VirtualGridBlock[]>;
    /** Row height in px. Default: the stylesheet's `grid-auto-rows`, else measured. */
    rowHeight: NumberConstructor;
    /** Extra rows rendered above and below the viewport. Default: 4. */
    overscan: NumberConstructor;
    /** Scroll container. Default: nearest scrollable ancestor, else the window. */
    scroller: PropType<HTMLElement | Window>;
    /** Element to render the grid as. */
    tag: {
        type: StringConstructor;
        default: string;
    };
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    /** The rendered item range changed. */
    range: (_start: number, _end: number) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /** Total number of items. */
    count: {
        type: NumberConstructor;
        required: true;
    };
    sections: PropType<VirtualGridSection[]>;
    blocks: PropType<VirtualGridBlock[]>;
    /** Row height in px. Default: the stylesheet's `grid-auto-rows`, else measured. */
    rowHeight: NumberConstructor;
    /** Extra rows rendered above and below the viewport. Default: 4. */
    overscan: NumberConstructor;
    /** Scroll container. Default: nearest scrollable ancestor, else the window. */
    scroller: PropType<HTMLElement | Window>;
    /** Element to render the grid as. */
    tag: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onRange?: ((_start: number, _end: number) => any) | undefined;
}>, {
    tag: string;
}, SlotsType<{
    default: {
        index: number;
    };
    section: {
        section: VirtualGridSection;
        index: number;
    };
    block: {
        block: VirtualGridBlock;
        index: number;
    };
}>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
