<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { Image } from '../../../types';

const props = defineProps<{
  image: Image,
}>();

defineEmits(['open-image', 'select-image']);
</script>

<template>
  <div
    class="v-thumbnail"
    :class="{ selected: props.image.selected }"
    @click.exact="$emit('open-image', image)"
    @click.ctrl="$emit('select-image', image)"
  >
    <!-- Image -->
    <div class="v-thumbnail__image-container">
      <img
        class="v-thumbnail__image"
        :src="`sight://${props.image.src}`"
        alt="image"
      >
    </div>

    <!-- Description -->
    <div class="v-thumbnail__description">
      <div class="v-thumbnail__title">
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
</template>

<style scoped>
.v-thumbnail {
  align-items: center;
  border: 1px solid #cecece;
  display: flex;
  margin: 0 auto;
  width: 300px;
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
  max-width: 80px;
  height: 60px;
}

/* Details */
.v-thumbnail__details {
  align-items: center;
  color: #505050;
  display: flex;
  font-size: 12px;
  height: 12px;
  justify-content: space-around;
  margin-top: 4px;
}

.v-thumbnail__details-ext {
  text-transform: uppercase;
}

.v-thumbnail__description {
  padding: 0 10px;
  width: 200px;
}

/* Title */
.v-thumbnail__title {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selected {
  background-color: #e8f5fe;
}
</style>
