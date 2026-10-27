import { onBeforeUnmount, onMounted } from 'vue';
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { track } from '../utils/openpanel';

const MILESTONES = [0, 25, 50, 75, 100];

/**
 * Records the deepest point the visitor scrolls to and sends it as a single `eventName`
 * when they leave the page: navigating away, closing the tab, or hiding it (mobile
 * browsers often skip `pagehide`). If a hidden tab becomes visible again, tracking resumes
 * and the next leave sends a new event.
 */
export default function useScrollDepthTracking(eventName: string) {
  let maxPercent = 0;
  let sent = false;

  function measure() {
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollable = scrollHeight - clientHeight;
    const percent = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);

    maxPercent = Math.max(maxPercent, Math.min(100, percent));
  }

  function flush() {
    if (sent) return;
    sent = true;

    measure();
    const milestone = MILESTONES.filter((value) => value <= maxPercent).at(-1);
    track(eventName, { percent: maxPercent, milestone });
  }

  const onScroll = useThrottleFn(measure, 250, true);

  onMounted(() => {
    measure();

    useEventListener(window, 'scroll', onScroll, { passive: true });
    useEventListener(window, 'pagehide', flush);
    useEventListener(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flush();
      } else {
        sent = false;
      }
    });
  });

  onBeforeUnmount(flush);
}
