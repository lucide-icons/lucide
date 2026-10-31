import { computed, onMounted, ref, watch, type ComponentPublicInstance, type Ref } from 'vue';
import { useWindowVirtualizer } from '@tanstack/vue-virtual';
import { useElementSize, useEventListener, useResizeObserver } from '@vueuse/core';

export const ICON_SIZE = 56;
export const ICON_GRID_GAP = 8;

interface UseIconGridVirtualizerOptions<Row> {
  /** Grid columns of the overview, from `useIconGridColumns`. */
  columns: ReturnType<typeof useIconGridColumns>;
  /** Element the virtual rows are rendered in. Its offset in the page is the scroll margin. */
  listEl: Ref<HTMLElement | null>;
  /** Sticky element at the top of the list. Its height is kept clear when scrolling to a row. */
  stickyEl?: Ref<HTMLElement | ComponentPublicInstance | null>;
  /** Rows to virtualize, usually icons chunked by `columns.columnSize`. */
  rows: Ref<Row[]>;
  /** Estimated row height. Rows are measured once rendered, so this only needs to be close. */
  estimateRowSize?: (row: Row, iconRowHeight: number) => number;
  getRowKey?: (row: Row, index: number) => string | number;
  overscan?: number;
}

/**
 * Number of icon columns that matches the CSS grid used by `IconGrid`:
 * `grid-template-columns: repeat(auto-fill, minmax(ICON_SIZE, 1fr))` with `gap: ICON_GRID_GAP`.
 */
export function getColumnCount(width: number) {
  if (width <= 0) return 0;

  return Math.max(1, Math.floor((width + ICON_GRID_GAP) / (ICON_SIZE + ICON_GRID_GAP)));
}

export function useIconGridColumns(containerEl: Ref<HTMLElement | null>) {
  const { width: containerWidth } = useElementSize(containerEl);
  const columnSize = computed(() => getColumnCount(containerWidth.value));

  /** Height of one row of icons: square cells that stretch to fill the row, plus the row gap. */
  const iconRowHeight = computed(() => {
    const columns = columnSize.value;
    if (!columns) return ICON_SIZE + ICON_GRID_GAP;

    const cellSize = (containerWidth.value - ICON_GRID_GAP * (columns - 1)) / columns;
    return cellSize + ICON_GRID_GAP;
  });

  return { containerWidth, columnSize, iconRowHeight };
}

function resolveElement(target: HTMLElement | ComponentPublicInstance | null | undefined) {
  if (target == null) return null;
  if (target instanceof HTMLElement) return target;

  return (target.$el as HTMLElement | null) ?? null;
}

/**
 * Virtualizes rows of icons against the window scroll, using `@tanstack/vue-virtual`.
 * Rows are measured after rendering, so rows of different heights (like category headings)
 * are positioned correctly.
 */
export default function useIconGridVirtualizer<Row>({
  columns,
  listEl,
  stickyEl,
  rows,
  estimateRowSize,
  getRowKey,
  overscan = 5,
}: UseIconGridVirtualizerOptions<Row>) {
  const { containerWidth, iconRowHeight } = columns;

  const scrollMargin = ref(0);
  const scrollPaddingStart = ref(0);

  function updateLayoutMetrics() {
    const list = listEl.value;
    if (list) {
      scrollMargin.value = Math.round(list.getBoundingClientRect().top + window.scrollY);
    }

    const sticky = resolveElement(stickyEl?.value);
    if (sticky) {
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      scrollPaddingStart.value = Math.round(stickyTop + sticky.offsetHeight);
    }
  }

  const virtualizer = useWindowVirtualizer<HTMLElement>(
    computed(() => {
      const rowList = rows.value;
      const rowHeight = iconRowHeight.value;

      return {
        count: rowList.length,
        estimateSize: (index: number) =>
          estimateRowSize ? estimateRowSize(rowList[index], rowHeight) : rowHeight,
        getItemKey: getRowKey ? (index: number) => getRowKey(rowList[index], index) : undefined,
        overscan,
        scrollMargin: scrollMargin.value,
        scrollPaddingStart: scrollPaddingStart.value,
      };
    }),
  );

  const virtualRows = computed(() => virtualizer.value.getVirtualItems());
  const totalSize = computed(() => virtualizer.value.getTotalSize());

  /** Offset of the first rendered row, relative to the top of the list element. */
  const offsetTop = computed(() => (virtualRows.value[0]?.start ?? 0) - scrollMargin.value);

  function measureElement(el: Element | ComponentPublicInstance | null) {
    if (el instanceof HTMLElement) {
      virtualizer.value.measureElement(el);
    }
  }

  function scrollToIndex(index: number) {
    updateLayoutMetrics();
    virtualizer.value.scrollToIndex(index, { align: 'start' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0 });
  }

  // Rows change completely when the width or the list changes, so drop cached row sizes.
  watch([containerWidth, rows], () => {
    updateLayoutMetrics();
    virtualizer.value.measure();
  });

  // The list element is only rendered once there are rows to show.
  watch(listEl, updateLayoutMetrics, { flush: 'post' });

  useEventListener('resize', updateLayoutMetrics, { passive: true });
  // Content above the list (page header, banners) can change height after mount.
  useResizeObserver(
    () => (typeof document !== 'undefined' ? document.body : null),
    updateLayoutMetrics,
  );

  onMounted(updateLayoutMetrics);

  return {
    virtualizer,
    virtualRows,
    totalSize,
    offsetTop,
    measureElement,
    scrollToIndex,
    scrollToTop,
  };
}
