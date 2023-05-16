<script setup lang="ts">
import { defineProps } from 'vue';
import { Image } from '../types';

defineProps<{
  activeImage?: Image,
}>();
</script>

<template>
  <div class="preview-block items-center flex justify-center w-full p-2">
    <img
      v-if="activeImage"
      class="preview-block__image max-h-full max-w-full"
      :src="`sight://${activeImage.src}`"
      alt="image"
    >
    <img
      v-else
      svg-inline
      class="preview-block__blank h-60 w-60"
      :src="'./portrait-black-18dp.svg'"
      alt="image"
    >
  </div>
</template>
