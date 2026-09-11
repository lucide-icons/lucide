import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Composable for handling search keyboard shortcuts.
 * Listens for Cmd/Ctrl+K and "/" keys to trigger a search action.
 *
 * @param callback - Function to execute when shortcut is triggered
 * @returns Object containing the platform-specific shortcut display text
 */
export default function useSearchShortcut(callback: () => void) {
  const shortcutText = ref('');

  function handleKeydown(event: KeyboardEvent) {
    // Check for Cmd+K (Mac), Ctrl+K (Windows/Linux), or forward slash
    if (((event.metaKey || event.ctrlKey) && event.key === 'k') || event.key === '/') {
      event.preventDefault();
      callback();
    }
  }

  onMounted(() => {
    // Detect platform and set appropriate keyboard shortcut for search focus
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    shortcutText.value = isMac ? '⌘K' : 'Ctrl+K';

    // Add keyboard shortcut listener
    window.addEventListener('keydown', handleKeydown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return { shortcutText };
}
