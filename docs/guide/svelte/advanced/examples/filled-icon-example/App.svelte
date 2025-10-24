<script>
import { Star, StarHalf } from "@lucide/svelte";
import "./icon.css";

const items = Array.from({ length: 5 })
</script>

<div class="app">
  <div class="star-rating">
    <div class="stars">
      {#each items as item}
        <Star
          fill="#111"
          strokeWidth="0"
        />
      {/each}
    </div>
    <div class="stars rating">
      <Star fill="yellow" strokeWidth="0" />
      <Star fill="yellow" strokeWidth="0" />
      <StarHalf fill="yellow" strokeWidth="0" />
    </div>
  </div>
</div>

