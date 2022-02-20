<script setup lang="ts">
import { defineProps } from 'vue'
import { Image } from '../../types';

defineProps<{
  activeImage?: Image,
}>();
</script>


<template>
  <div class="preview-block">
    <img
      v-if="activeImage"
      class="preview-block__image"
      :src="`sight://${activeImage.src}`"
      alt="image"
    >
    <img
      v-else
      svg-inline
      class="preview-block__blank"
      :src="'./images/portrait-black-18dp.svg'"
      alt="image"
    >
  </div>
</template>

<style scoped>
.preview-block {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
}

.preview-block__image {
  max-height: 100%;
  max-width: 100%;
}

.preview-block__blank {
  height: 350px;
  width: 350px;
}
</style>
