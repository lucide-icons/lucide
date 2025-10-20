<script setup>
import { Mail } from "lucide-vue-next";

const hasUnreadMessages = true;
</script>

<template>
  <div class="app">
    <Mail :size="48">
      <circle
        v-if="hasUnreadMessages"
        r="3"
        cx="21"
        cy="5"
        stroke="none"
        fill="#F56565"
      />
    </Mail>
  </div>
</template>
