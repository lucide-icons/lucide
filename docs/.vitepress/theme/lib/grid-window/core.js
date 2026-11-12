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
/** Number of values in the sorted array that are <= x. */
const upper = (sorted, x) => {
    let lo = 0;
    let hi = sorted.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sorted[mid] <= x)
            lo = mid + 1;
        else
            hi = mid;
    }
    return lo;
};
const div = () => document.createElement('div');
const mover = (parent) => 'moveBefore' in parent
    ? (node, before) => {
        if (node.parentNode === parent)
            parent.moveBefore(node, before);
        else
            parent.insertBefore(node, before);
    }
    : (node, before) => parent.insertBefore(node, before);
const findScroller = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
        const { overflowY } = getComputedStyle(p);
        if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
            // On <html>/<body> the overflow propagates to the viewport.
            return p === document.documentElement || p === document.body ? window : p;
        }
    }
    return window;
};
export function virtualGrid(grid, options) {
    const { create = div, overscan = 4, onRange, onView } = options;
    const render = options.render ?? (() => { });
    const manual = !options.render; // headless: the caller renders the children
    let waiting = false; // headless: one item is out for measuring
    let count = options.count;
    let sections = options.sections ?? [];
    let blocks = options.blocks ?? [];
    const scroller = options.scroller ?? findScroller(grid);
    const move = mover(grid);
    const els = []; // rendered slot elements, in slot order
    const pool = []; // detached item elements ready for reuse
    const blockEls = new Map();
    const headerEls = new Map();
    const isHeader = new WeakSet(); // header elements are never pooled
    let start = 0; // first rendered slot
    let end = 0; // one past the last rendered slot
    let firstRow = 0; // first rendered row
    let lastRow = 0; // one past the last rendered row
    let columns = 0;
    let rows = 0; // total rows, headers and blocks included
    let segments = [];
    let segRow = []; // segments[i].row, for binary search
    let segBase = []; // segments[i].base
    let placed = [];
    let headers = []; // sections in slot order
    let headerSlot = []; // slot of each header
    let headerId = []; // position in `sections` of each header
    let headerIndex = []; // item index each header sits before
    let sectionSlot = []; // header slot by position in `sections`
    let tall = []; // headers taller than one row
    let rowHeight = options.rowHeight ?? 0;
    let gap = 0;
    let padStart = 0; // the grid's own padding, from the stylesheet
    let padEnd = 0;
    let padBefore = 0; // what we currently add on top of it
    let padAfter = 0;
    let dirty = false; // rendered items are stale and must be re-rendered
    let ownRows = false; // `grid-auto-rows` on the grid's style was set by us
    let width = -1;
    let destroyed = false;
    // The browser must not try to "anchor" the scroll position to elements we
    // are about to recycle, and nothing inside the grid affects outside layout.
    grid.style.overflowAnchor = 'none';
    grid.style.contain = 'layout style';
    // --- Layout model: which row holds which slots ---------------------------
    //
    // Without sections or blocks this is `row = floor(index / columns)`. A
    // header takes a row of its own and ends the row before it; a block takes
    // cells out of the rows it covers. Rows between two such edges all hold the
    // same number of slots, which gives a short list of segments and
    // logarithmic lookups in both directions.
    const layout = () => {
        const secs = sections
            .map((section, id) => ({ section, id, index: Math.max(0, Math.min(count, section.index)) }))
            .sort((a, b) => a.index - b.index);
        segments = [];
        placed = [];
        tall = [];
        headers = secs.map((s) => s.section);
        headerId = secs.map((s) => s.id);
        headerIndex = secs.map((s) => s.index);
        headerSlot = [];
        sectionSlot = [];
        let R = 0; // rows so far
        let B = 0; // slots so far
        // One group = an optional header plus the items [from, to) below it.
        const group = (from, to, id, header) => {
            if (header) {
                const h = Math.max(1, header.rows ?? 1);
                sectionSlot[id] = B;
                headerSlot.push(B);
                segments.push({ row: R, cap: 1, base: B, end: 0 });
                if (h > 1)
                    tall.push({ r0: R, r1: R + h });
                B++;
                R += h;
            }
            const n = to - from;
            const all = blocks
                .filter((block) => !secs.length || (block.section ?? 0) === id)
                .map((block) => {
                const full = columns < (block.minColumns ?? block.columns + 2);
                const span = full ? columns : Math.min(block.columns, columns);
                const column = block.column ?? 0;
                const c0 = column < 0 ? Math.max(0, columns - span + column + 1) : Math.min(column, columns - span);
                const r0 = Math.max(0, block.row);
                return { block, el: null, r0, r1: r0 + Math.max(1, block.rows), c0, span, on: false };
            })
                .sort((a, b) => a.r0 - b.r0);
            const edges = [...new Set([0, ...all.flatMap((p) => [p.r0, p.r1])])].sort((a, b) => a - b);
            let base = 0;
            let itemRows = n ? -1 : 0; // rows needed to hold this group's items
            edges.forEach((row, i) => {
                if (itemRows >= 0)
                    return;
                const taken = all.reduce((t, p) => (p.r0 <= row && row < p.r1 ? t + p.span : t), 0);
                const cap = Math.max(0, columns - taken);
                const next = edges[i + 1] ?? Infinity;
                segments.push({ row: R + row, cap, base: B + base, end: 0 });
                if (cap && base + (next - row) * cap >= n)
                    itemRows = row + Math.ceil((n - base) / cap);
                else
                    base += (next - row) * cap;
            });
            // A block that would start below the group's last item is left out; one
            // that reaches below it makes the group taller.
            let height = itemRows;
            for (const p of all) {
                if (p.r0 >= itemRows)
                    continue;
                height = Math.max(height, p.r1);
                placed.push({ ...p, r0: R + p.r0, r1: R + p.r1 });
            }
            R += height;
            B += n;
        };
        if (!secs.length || secs[0].index > 0)
            group(0, secs[0]?.index ?? count, -1);
        secs.forEach((s, i) => group(s.index, secs[i + 1]?.index ?? count, s.id, s.section));
        if (!segments.length)
            segments.push({ row: 0, cap: columns, base: 0, end: 0 });
        segments.forEach((s, i) => (s.end = segments[i + 1]?.base ?? B));
        segRow = segments.map((s) => s.row);
        segBase = segments.map((s) => s.base);
        rows = R;
        dirty = true;
    };
    /** Number of slots in all rows above `row`. */
    const slotsBefore = (row) => {
        const s = segments[Math.max(0, upper(segRow, row) - 1)];
        return Math.min(s.end, s.base + (row - s.row) * s.cap);
    };
    /** Row that holds slot `slot`. */
    const rowOf = (slot) => {
        const s = segments[Math.max(0, upper(segBase, slot) - 1)];
        return s.row + Math.floor((slot - s.base) / (s.cap || 1));
    };
    /** Position in `headers` if the slot is a header, else -1 - (headers before it). */
    const headerAt = (slot) => {
        const i = upper(headerSlot, slot) - 1;
        return i >= 0 && headerSlot[i] === slot ? i : -2 - i;
    };
    const slotOfItem = (index) => index + upper(headerIndex, index);
    const itemsBeforeSlot = (slot) => slot - upper(headerSlot, slot - 1);
    // --- Reading from the browser ---------------------------------------------
    /**
     * Read layout facts from the browser. One style/layout read; the only write
     * is taking back the `grid-auto-rows` we set, so the row height can follow
     * the items again (e.g. `1fr` columns with `aspect-ratio` items).
     */
    const measure = () => {
        if (ownRows)
            (grid.style.gridAutoRows = ''), (ownRows = false);
        const cs = getComputedStyle(grid);
        // Used value is a px track list, e.g. "56px 56px 56px" (plus optional
        // "[line-names]", which we skip).
        const tracks = cs.gridTemplateColumns.split(' ').filter((t) => t && t[0] !== '[' && t !== 'none');
        const before = columns;
        columns = Math.max(1, tracks.length);
        gap = parseFloat(cs.rowGap) || 0;
        // Computed padding = the stylesheet's padding + what we added.
        padStart = Math.max(0, Math.round((parseFloat(cs.paddingBlockStart) - padBefore) * 64) / 64) || 0;
        padEnd = Math.max(0, Math.round((parseFloat(cs.paddingBlockEnd) - padAfter) * 64) / 64) || 0;
        // Row height: the option, else the stylesheet's `grid-auto-rows`, else
        // the height of a rendered item.
        const auto = /^[\d.]+px$/.test(cs.gridAutoRows) ? parseFloat(cs.gridAutoRows) : 0;
        if (options.rowHeight || !count) {
            // nothing to measure
        }
        else if (auto) {
            rowHeight = auto;
        }
        else {
            // Measure a row of rendered items: with `1fr` tracks they can differ by
            // a fraction of a pixel, and the row is as tall as the tallest. Headless:
            // the caller renders the cells first and in order, so child `i` is slot
            // `start + i`; before anything is rendered, ask for one item. Otherwise
            // render one just for this if there is none.
            const items = manual
                ? [...grid.children].slice(0, rowHeight ? end - start : 1).filter((_, i) => !rowHeight || headerAt(start + i) < 0)
                : els.filter((el) => !isHeader.has(el));
            const temp = !manual && !items.length && grid.appendChild((items[0] = pool.pop() ?? create()));
            if (temp)
                render(items[0], 0);
            if (items.length)
                rowHeight = Math.max(...items.slice(0, columns).map((el) => el.getBoundingClientRect().height)) || rowHeight;
            else if (!rowHeight && !waiting) {
                waiting = true;
                onView?.({ cells: [{ type: 'item', index: 0 }], blocks: [], pending: true });
            }
            if (temp)
                pool.push(grid.removeChild(temp));
        }
        // Headers and blocks need rows of a definite size: a header's row would
        // otherwise follow the header's content, and a block spans rows that may
        // hold no items. Supply the size if the stylesheet doesn't.
        if ((blocks.length || sections.length) && rowHeight && cs.gridAutoRows === 'auto') {
            grid.style.gridAutoRows = rowHeight + 'px';
            ownRows = true;
        }
        if (columns !== before || dirty)
            layout();
    };
    /** Viewport position relative to the top of the first row, in px. */
    const viewport = () => {
        const top = grid.getBoundingClientRect().top + padStart;
        if (scroller === window)
            return [-top, window.innerHeight];
        const s = scroller;
        return [s.getBoundingClientRect().top + s.clientTop - top, s.clientHeight];
    };
    // --- Writing to the DOM ----------------------------------------------------
    /** Element for a slot: a recycled item element, or a section's header. */
    const acquire = (slot) => {
        const h = headerAt(slot);
        if (h < 0) {
            const el = pool.pop() ?? create();
            render(el, slot + h + 1);
            return el;
        }
        const section = headers[h];
        let el = headerEls.get(section);
        if (!el) {
            headerEls.set(section, (el = (section.create ?? div)()));
            isHeader.add(el);
            section.render?.(el);
        }
        // Auto-placed and as wide as the grid: the browser puts it on the first
        // row that is completely free, and the items after it on the rows below.
        el.style.gridColumn = '1 / -1';
        el.style.gridRow = (section.rows ?? 1) > 1 ? `span ${section.rows}` : '';
        return el;
    };
    const release = (el) => {
        el.remove();
        if (!isHeader.has(el))
            pool.push(el);
    };
    /** Stand in for the rows that are not rendered (each with its gap). */
    const pad = () => {
        const stride = rowHeight + gap;
        const before = firstRow * stride;
        // If nothing is rendered there is one gap too many in the sum.
        const after = Math.max(0, (rows - lastRow) * stride - (lastRow > firstRow ? 0 : gap));
        if (before === padBefore && after === padAfter)
            return;
        grid.style.paddingBlock = `${padStart + (padBefore = before)}px ${padEnd + (padAfter = after)}px`;
    };
    /** Bring the DOM in line with the rows [first, last). */
    const commit = (first, last) => {
        if (first === firstRow && last === lastRow && !dirty)
            return;
        const s = slotsBefore(first);
        const e = slotsBefore(last);
        if (manual) {
            // Headless: describe the children instead of creating them.
            dirty = false;
            const cells = [];
            for (let slot = s; slot < e; slot++) {
                const h = headerAt(slot);
                if (h < 0)
                    cells.push({ type: 'item', index: slot + h + 1 });
                else {
                    const n = headers[h].rows ?? 1;
                    cells.push({
                        type: 'section',
                        section: headerId[h],
                        style: { gridColumn: '1 / -1', gridRow: n > 1 ? `span ${n}` : undefined },
                    });
                }
            }
            const visible = placed
                .filter((p) => p.r0 < last && p.r1 > first)
                .map((p) => ({
                block: blocks.indexOf(p.block),
                style: { gridRow: `${p.r0 - first + 1} / span ${p.r1 - p.r0}`, gridColumn: `${p.c0 + 1} / span ${p.span}` },
            }));
            start = s;
            end = e;
            firstRow = first;
            lastRow = last;
            onView?.({ cells, blocks: visible, pending: false });
            onRange?.(itemsBeforeSlot(s), itemsBeforeSlot(e));
            return;
        }
        if (dirty || s >= end || e <= start) {
            // Nothing in common with what is rendered (jump scroll, new layout):
            // empty the grid in one go and fill it again from the pool.
            dirty = false;
            for (const el of els)
                if (!isHeader.has(el))
                    pool.push(el);
            els.length = 0;
            grid.replaceChildren();
            for (const p of placed)
                p.on = false;
            const fragment = document.createDocumentFragment();
            for (let slot = s; slot < e; slot++)
                fragment.append(els[slot - s] = acquire(slot));
            grid.append(fragment);
        }
        else {
            // Overlap (normal scrolling): recycle what left, add what entered.
            while (start < s)
                (release(els.shift()), start++);
            while (end > e)
                (release(els.pop()), end--);
            while (start > s) {
                const el = acquire(--start);
                move(el, els[0] ?? null);
                els.unshift(el);
            }
            while (end < e) {
                const el = acquire(end++);
                move(el, null);
                els.push(el);
            }
        }
        // Blocks are placed explicitly; grid row 1 is the first *rendered* row.
        for (const p of placed) {
            const visible = p.r0 < last && p.r1 > first;
            if (visible && !p.on) {
                let el = blockEls.get(p.block);
                if (!el) {
                    blockEls.set(p.block, (el = (p.block.create ?? div)()));
                    p.block.render?.(el);
                }
                el.style.gridColumn = `${p.c0 + 1} / span ${p.span}`;
                // Placement ignores DOM order; this only keeps tab order sensible.
                grid.insertBefore((p.el = el), els[slotsBefore(p.r0) - s] ?? null);
            }
            else if (!visible && p.on)
                p.el.remove();
            if ((p.on = visible))
                p.el.style.gridRow = `${p.r0 - first + 1} / span ${p.r1 - p.r0}`;
        }
        start = s;
        end = e;
        firstRow = first;
        lastRow = last;
        // Recycled elements are only kept for reuse while scrolling; cap the pool.
        pool.length = Math.min(pool.length, columns * 2);
        onRange?.(itemsBeforeSlot(s), itemsBeforeSlot(e));
    };
    /** Read phase, then write phase — never interleaved. */
    const sync = () => {
        if (destroyed)
            return;
        if (!rowHeight)
            measure();
        if (manual && !rowHeight && count)
            return; // waiting for the item to measure
        const stride = rowHeight + gap;
        if (!stride || !rows)
            return commit(0, 0), pad();
        const [offset, height] = viewport();
        let first = Math.max(0, Math.min(rows, Math.floor(offset / stride) - overscan));
        let last = Math.max(first, Math.min(rows, Math.ceil((offset + height) / stride) + overscan));
        // A block or tall header is either fully inside the rendered rows or not
        // rendered, so widen the window to the edges of every one it touches.
        for (let grown = true; grown;) {
            grown = false;
            for (const list of [placed, tall]) {
                for (const p of list) {
                    if (p.r0 >= last || p.r1 <= first)
                        continue;
                    if (p.r0 < first)
                        (first = p.r0), (grown = true);
                    if (p.r1 > last)
                        (last = p.r1), (grown = true);
                }
            }
        }
        commit(first, last);
        pad();
    };
    /** Layout-affecting change (resize, count): re-measure and rebuild. */
    const relayout = () => {
        if (destroyed)
            return;
        const oldColumns = columns;
        const oldStride = rowHeight + gap;
        // Remember which slot is at the top of the viewport in the old layout.
        const offset = oldStride && rows ? viewport()[0] : 0;
        const anchor = offset > 0 ? slotsBefore(Math.floor(offset / oldStride)) : -1;
        measure();
        sync();
        if ((columns === oldColumns && rowHeight + gap === oldStride) || !oldColumns || anchor < 0 || anchor >= segments[segments.length - 1].end)
            return;
        // The column count or the row height changed, so rows moved. Keep that
        // slot at the top of the viewport instead of keeping the pixel offset.
        const target = rowOf(anchor) * (rowHeight + gap) + (offset % oldStride);
        scroller.scrollBy({ top: target - viewport()[0], behavior: 'instant' });
        sync();
    };
    // Scroll events are dispatched once per frame, right before rendering, so
    // there is nothing to gain from an extra requestAnimationFrame hop.
    scroller.addEventListener('scroll', sync, { passive: true });
    // The grid's width decides the column count.
    const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (entry.target !== grid)
                sync();
            else if (width !== (width = entry.contentBoxSize[0].inlineSize))
                relayout();
        }
    });
    ro.observe(grid);
    // The scroller's height decides how many rows are visible.
    if (scroller === window)
        window.addEventListener('resize', sync, { passive: true });
    else
        ro.observe(scroller);
    relayout();
    const scrollToRow = (row, { align = 'start', behavior } = {}) => {
        const [offset, height] = viewport();
        const extra = align === 'center' ? (height - rowHeight) / 2 : align === 'end' ? height - rowHeight : 0;
        scroller.scrollBy({ top: row * (rowHeight + gap) - extra - offset, behavior });
    };
    return {
        get range() {
            return [itemsBeforeSlot(start), itemsBeforeSlot(end)];
        },
        get columns() {
            return columns;
        },
        update(next = {}) {
            if (typeof next === 'number')
                next = { count: next };
            count = next.count ?? count;
            sections = next.sections ?? sections;
            blocks = next.blocks ?? blocks;
            // Headers and blocks are rendered again the next time they are shown.
            headerEls.clear();
            blockEls.clear();
            dirty = true; // rebuild the layout and re-render everything visible
            relayout();
        },
        refresh: relayout,
        scrollTo(index, options) {
            scrollToRow(rowOf(slotOfItem(Math.max(0, Math.min(count - 1, index)))), options);
        },
        scrollToSection(section, options) {
            if (sectionSlot[section] !== undefined)
                scrollToRow(rowOf(sectionSlot[section]), options);
        },
        destroy() {
            destroyed = true;
            ro.disconnect();
            scroller.removeEventListener('scroll', sync);
            window.removeEventListener('resize', sync);
            if (!manual)
                grid.replaceChildren();
            els.length = pool.length = 0;
            blockEls.clear();
            headerEls.clear();
            grid.style.overflowAnchor = grid.style.contain = grid.style.paddingBlock = grid.style.gridAutoRows = '';
        },
    };
}
