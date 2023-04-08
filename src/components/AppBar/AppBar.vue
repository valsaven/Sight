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
  <div class="app-bar">
    <!-- SEARCH -->
    <search-block
      class="app-bar__item"
      :images="props.images"
      @load-images="loadImages"
      @clear-images="$emit('clear-images')"
    />

    <!-- SHORT INFO -->
    <short-info-block
      class="app-bar__item"
      :total="props.images.length"
    />

    <!-- DELETE -->
    <delete-block
      class="app-bar__item"
      @toggle-delete-mode="toggleDeleteMode"
      @delete-images="$emit('delete-images')"
    />
    <!-- FIXME: [Vue warn]: Avoid mutating a prop directly at line 18 -->
  </div>
</template>

<style>
.app-bar {
  background-color: #f1f1f1;
  display: flex;
  padding: 10px 0 10px;
}

.app-bar__item {
  flex: 20%;
}
</style>
