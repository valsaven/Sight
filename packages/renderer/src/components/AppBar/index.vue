<template>
  <div class="app-bar">
    <!-- SEARCH -->
    <search-block
      class="app-bar__item"
      :images="images"
      @load-images="loadImages"
      @clear-images="$emit('clear-images')"
    />

    <!-- SHORT INFO -->
    <short-info-block
      class="app-bar__item"
      :total="images.length"
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

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import SearchBlock from './components/SearchBlock.vue';
import ShortInfoBlock from './components/ShortInfoBlock.vue';
import DeleteBlock from './components/DeleteBlock.vue';

import { Images } from '../../types';

export default defineComponent({
  name: "AppBar",
  components: {
    SearchBlock,
    ShortInfoBlock,
    DeleteBlock,
  },
  props: {
    deleteToRecycleBin: {
      type: Boolean,
      default: true,
      required: true,
    },

    images: {
      type: Array as PropType<Images>,
      default: () => [],
      required: true,
    },
  },
  emits: ['load-images', 'clear-images', 'delete-images'],
  methods: {
    loadImages(images: Images): Images {
      this.$emit('load-images', images);
      return images;
    },

    toggleDeleteMode(val: boolean): boolean {
      return val;
    }
  }
})
</script>

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
