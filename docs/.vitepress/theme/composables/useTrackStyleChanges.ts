import { watch, type Ref } from 'vue';
import { trackDebounced } from '../utils/openpanel';

interface StyleRefs {
  color: Ref<string>;
  strokeWidth: Ref<number>;
  size: Ref<number>;
  nonScalingStroke: Ref<boolean>;
}

/**
 * Tracks user changes to the icon style controls. Call it from `onMounted` so values
 * restored from local storage don't count as a change.
 */
export default function useTrackStyleChanges(eventName: string, style: StyleRefs) {
  (Object.keys(style) as (keyof StyleRefs)[]).forEach((option) => {
    watch(style[option], (value) => {
      trackDebounced(`${eventName}:${option}`, eventName, { option, value });
    });
  });
}
