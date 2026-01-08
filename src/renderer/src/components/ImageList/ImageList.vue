<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useVirtualizer } from '@tanstack/vue-virtual';
import type { Image, Images } from '../../types';
import VThumbnail from './components/VThumbnail.vue';

const props = defineProps<{
  images: Images;
  activeImage?: Image | null;
  selectedImages?: Images;
}>();

const emit = defineEmits(['open-image', 'select-image']);

// Scroll container
const parentRef = ref<HTMLElement | null>(null);

// Height of one thumbnail
const itemHeight = 80;

// Virtualizer
const rowVirtualizer = useVirtualizer({
  // Make count reactive
  get count() {
    return props.images.length;
  },
  getScrollElement: () => parentRef.value,
  estimateSize: () => itemHeight,
  overscan: 10,
});

// Reactive values
const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

// Force update virtualizer when images change
watch(
  () => props.images.length,
  () => {
    rowVirtualizer.value.measure();
  }
);
</script>

<template>
  <div ref="parentRef" class="image-list">
    <!-- Full height of the list -->
    <div class="image-list__images" :style="{ height: `${totalSize}px` }">
      <!-- Visible items -->
      <div v-for="virtualRow in virtualItems" :key="virtualRow.key.toString()" class="image-list__image" :style="{
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
      }">
        <v-thumbnail :image="props.images[virtualRow.index]"
          @open-image="$emit('open-image', props.images[virtualRow.index])"
          @select-image="$emit('select-image', props.images[virtualRow.index])" />
      </div>

      <!-- Placeholder when the list is empty -->
      <div v-if="props.images.length === 0" class="image-list__placeholder">
        No images
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-list {
  border-right: 1px solid var(--border);
  height: 100%;
  max-width: 340px;
  overflow-y: auto;
  width: 100%;
}

.image-list__images {
  position: relative;
  width: 100%;
}

.image-list__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.image-list__placeholder {
  color: var(--text-secondary);
  left: 10%;
  position: fixed;
  top: 10%;
}
</style>
