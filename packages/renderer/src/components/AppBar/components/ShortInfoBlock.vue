<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  total: Number,
}>();
</script>

<template>
  <div class="short-info">
    <span class="short-info__files-number">
      {{ total }} image(s)
    </span>
  </div>
</template>
