import { onMounted } from 'vue';
import { useEventListener, useThrottleFn } from '@vueuse/core';
import { track } from '../utils/openpanel';

const MILESTONES = [25, 50, 75, 100];

/**
 * Sends `eventName` once per milestone (25/50/75/100%) the visitor scrolls to on this page.
 */
export default function useScrollDepthTracking(eventName: string) {
  const reached = new Set<number>();

  const onScroll = useThrottleFn(
    () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          track(eventName, { percent: milestone });
        }
      }
    },
    250,
    true,
  );

  onMounted(() => {
    useEventListener(window, 'scroll', onScroll, { passive: true });
  });
}
