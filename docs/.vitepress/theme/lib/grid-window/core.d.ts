/**
 * @grid-window/core — a tiny virtualizer for CSS grid.
 *
 * The grid itself stays in charge of layout: column count, track sizes and
 * gaps are read back from the browser (`grid-template-columns` resolves to
 * the used track list), so `repeat(auto-fill, 56px)` just works and the
 * library never does layout math the browser already did.
 *
 * Only the rows near the viewport exist in the DOM. Everything above and
 * below is replaced by block padding on the grid, so the grid's children are
 * exactly the rendered items, plus:
 *
 * - `sections`: a full-width header row before a given item. The header is a
 *   normal auto-placed grid item spanning all columns, so the browser itself
 *   moves it (and everything after it) to the next free row.
 * - `blocks`: larger cards pinned to a grid position, which the browser's
 *   auto-placement flows the items around.
 */
export interface VirtualGridSection {
    /** The header sits before item `index`; that item starts a new row. */
    index: number;
    /** Height of the header in rows. Default: 1. */
    rows?: number;
    /** Fill the header's element. Called once, and again after `update()`. */
    render?: (el: HTMLElement) => void;
    /** Create the header's element. Default: a `<div>`. */
    create?: () => HTMLElement;
}
export interface VirtualGridBlock {
    /**
     * Position in `sections` of the section this block belongs to. `row` then
     * counts from the first row below that section's header. Default: 0.
     */
    section?: number;
    /** First row the block occupies, 0-based. */
    row: number;
    /**
     * First column, 0-based. Negative values count from the right edge:
     * `-1` is flush right, `-2` leaves one free column, … Default: 0.
     */
    column?: number;
    /** Width in columns. */
    columns: number;
    /** Height in rows. */
    rows: number;
    /**
     * The block spans the full width when the grid has fewer columns than
     * this. Default: `columns + 2`.
     */
    minColumns?: number;
    /** Fill the block's element. Called once, and again after `update()`. */
    render?: (el: HTMLElement) => void;
    /** Create the block's element. Default: a `<div>`. */
    create?: () => HTMLElement;
}
export interface VirtualGridOptions {
    /** Total number of items. */
    count: number;
    /**
     * Fill `el` for item `index`. Elements are recycled, so always overwrite.
     * Leave it out and pass `onView` to render the grid's children yourself.
     */
    render?: (el: HTMLElement, index: number) => void;
    /**
     * Headless mode, for framework adapters. The library creates no elements:
     * it reports what should be in the grid and you render exactly that as the
     * grid's children, cells first and in order. Without `rowHeight`, the row
     * height comes from the stylesheet's `grid-auto-rows`, or else from the
     * first cell you render (see `VirtualGridView.pending`).
     */
    onView?: (view: VirtualGridView) => void;
    /** Create an empty item element. Default: a `<div>`. */
    create?: () => HTMLElement;
    /** Full-width header rows that split the items into sections. */
    sections?: VirtualGridSection[];
    /** Larger cards pinned to a grid position. They must not overlap. */
    blocks?: VirtualGridBlock[];
    /**
     * Row height in px. Default: the stylesheet's `grid-auto-rows`, else
     * measured from a rendered item, again whenever the grid's width changes.
     */
    rowHeight?: number;
    /** Extra rows rendered above and below the viewport. Default: 4. */
    overscan?: number;
    /** Scroll container. Default: nearest scrollable ancestor, else the window. */
    scroller?: HTMLElement | Window;
    /** Called whenever the rendered index range changes. */
    onRange?: (start: number, end: number) => void;
}
export type VirtualGridCell = 
/** Item `index`. */
{
    type: 'item';
    index: number;
}
/** Header of `sections[section]`; apply `style` to its element. */
 | {
    type: 'section';
    section: number;
    style: {
        gridColumn: string;
        gridRow?: string;
    };
};
export interface VirtualGridView {
    /** The auto-placed children of the grid, in DOM order. */
    cells: VirtualGridCell[];
    /** Visible `blocks[block]`; apply `style` to each one's element. */
    blocks: {
        block: number;
        style: {
            gridRow: string;
            gridColumn: string;
        };
    }[];
    /**
     * True while the row height is still unknown: render the cells (a single
     * item), then call `refresh()` so that item can be measured.
     */
    pending: boolean;
}
export interface VirtualGrid {
    /** Currently rendered item range, `[start, end)`. */
    readonly range: readonly [start: number, end: number];
    /** Current column count as resolved by the browser. */
    readonly columns: number;
    /**
     * Re-render everything visible. Pass a new count, or new `count`,
     * `sections` and/or `blocks`, to change the content at the same time.
     */
    update(next?: number | Pick<Partial<VirtualGridOptions>, 'count' | 'sections' | 'blocks'>): void;
    /** Measure again and re-sync, e.g. after a change the library can't see. */
    refresh(): void;
    /** Scroll so that item `index` is in view. */
    scrollTo(index: number, options?: ScrollToOptions): void;
    /** Scroll so that the header of section `section` is in view. */
    scrollToSection(section: number, options?: ScrollToOptions): void;
    /** Remove listeners and all elements the library created. */
    destroy(): void;
}
export interface ScrollToOptions {
    align?: 'start' | 'center' | 'end';
    behavior?: ScrollBehavior;
}
export declare function virtualGrid(grid: HTMLElement, options: VirtualGridOptions): VirtualGrid;
