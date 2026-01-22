<script setup lang="ts">
import { Image } from '../../../types';

const props = defineProps({
  image: Object as () => Image,
});

defineEmits(['open-image', 'select-image']);

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
</script>

<template>
  <div v-if="props.image" class="v-thumbnail" :class="{ 'v-thumbnail--selected': props.image.selected }"
    @click.exact="$emit('open-image', image)" @click.ctrl="$emit('select-image', image)">
    <!-- Image -->
    <div class="v-thumbnail__image-container">
      <img class="v-thumbnail__image" :src="props.image.thumbnailSrc || 'fallback-placeholder.png'" alt="image" />
    </div>

    <!-- Description -->
    <div class="v-thumbnail__description">
      <div class="v-thumbnail__title" title="Copy full name to clipboard" @click="copyToClipboard(props.image.name)">
        {{ props.image.name }}
      </div>

      <div class="v-thumbnail__details">
        <div class="v-thumbnail__details-size">
          {{ props.image.dimensions }}
        </div>
        <div class="v-thumbnail__details-ext">
          {{ props.image.ext }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>x</div>
</template>

<style scoped>
.v-thumbnail {
  align-items: center;
  border: 1px solid #cecece;
  display: flex;
  margin: 0 auto;
  width: 300px;
}

.v-thumbnail--selected {
  background-color: var(--selected);
}

/* Image */
.v-thumbnail__image-container {
  align-items: center;
  border-right: 2px dashed #cecece;
  display: flex;
  height: 60px;
  justify-content: center;
  width: 78px;
}

.v-thumbnail__image {
  max-height: 100%;
  max-width: 72px;
}

.v-thumbnail__description {
  padding: 0 10px;
  width: 200px;
}

/* Details */
.v-thumbnail__details {
  align-items: center;
  color: var(--text-secondary);
  display: flex;
  font-size: 12px;
  height: 12px;
  justify-content: space-around;
  margin-top: 4px;
}

.v-thumbnail__details-ext {
  text-transform: uppercase;
}

.v-thumbnail__title {
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
}

.v-thumbnail__title:hover {
  color: var(--accent);
}
</style>
