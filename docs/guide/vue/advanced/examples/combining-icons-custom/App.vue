<script setup>
import { File } from "lucide-vue-next";
</script>

<template>
  <div class="app">
    <File :size="48">
      <text
        x="7.5"
        y="19"
        font-size="8"
        font-family="Verdana,sans-serif"
        :stroke-width="1"
      >
        JS
      </text>
    </File>
  </div>
</template>
