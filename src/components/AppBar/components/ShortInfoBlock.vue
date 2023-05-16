<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  total: number,
}>();

const imageText = computed(() => (props.total !== 1 ? 'images' : 'image'));
</script>

<template>
  <div class="short-info flex">
    <span class="short-info__files-number">
      {{ total }} {{ imageText }}
    </span>
  </div>
</template>
