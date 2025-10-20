<script setup>
import { Star, StarHalf } from "lucide-vue-next";
import "./icon.css";
</script>

<template>
  <div class="app">
    <div class="star-rating">
      <div class="stars">
        <Star
          v-for="i in 5"
          fill="#111"
          strokeWidth="0"
        />
      </div>
      <div class="stars rating">
        <Star fill="yellow" strokeWidth="0" />
        <Star fill="yellow" strokeWidth="0" />
        <StarHalf fill="yellow" strokeWidth="0" />
      </div>
    </div>
  </div>
</template>
