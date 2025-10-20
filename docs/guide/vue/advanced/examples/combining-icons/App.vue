<script setup>
import { Scan, User } from "lucide-vue-next";
</script>

<template>
  <div class="app">
    <Scan :size="48">
      <User
        :size="12"
        x="6"
        y="6"
        absoluteStrokeWidth
      />
    </Scan>
  </div>
</template>
