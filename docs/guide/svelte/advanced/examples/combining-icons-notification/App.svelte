<script>
import { Mail } from "@lucide/svelte";

const hasUnreadMessages = true;
</script>

<div class="app">
  <Mail size="48">
    {#if hasUnreadMessages}
      <circle
        r="3"
        cx="21"
        cy="5"
        stroke="none"
        fill="#F56565"
      />
    {/if}
  </Mail>
</div>

