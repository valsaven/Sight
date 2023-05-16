<script setup lang="ts">
import SearchBlock from './components/SearchBlock.vue';
import ShortInfoBlock from './components/ShortInfoBlock.vue';
import DeleteBlock from './components/DeleteBlock.vue';

import { Images } from '../../types';

const props = defineProps<{
  deleteToRecycleBin: {
    type: boolean,
    default: true,
    required: true,
  },

  images: {
    type: Images, // FIX
    default: () => [],
    required: true,
  },
}>();

const emit = defineEmits(['load-images', 'clear-images', 'delete-images']);

function loadImages(images: Images): Images {
  emit('load-images', images);
  return images;
}

function toggleDeleteMode(val: boolean): boolean {
  return val;
}
</script>

<template>
  <div class="app-bar bg-gray-200 flex m-2 p-4 flex-initial">
    <!-- SEARCH -->
    <search-block
      class="basis-1/3 flex items-center justify-start"
      :images="props.images"
      @load-images="loadImages"
      @clear-images="$emit('clear-images')"
    />

    <!-- SHORT INFO -->
    <short-info-block
      class="basis-1/3 flex items-center justify-center"
      :total="props.images.length"
    />

    <!-- DELETE -->
    <delete-block
      class="basis-1/3 flex items-center justify-end"
      @toggle-delete-mode="toggleDeleteMode"
      @delete-images="$emit('delete-images')"
    />
    <!-- FIXME: [Vue warn]: Avoid mutating a prop directly at line 18 -->
  </div>
</template>

<style>
.app-bar__item {
  flex: 20%;
}
</style>
