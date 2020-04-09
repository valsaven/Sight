<template>
  <div class="v-preview">
    <div class="v-preview__body">
      <div class="v-preview__image">
        <img
          class="v-preview__image-src"
          :src="`file:///${image.src}`"
          alt="image"
        >
      </div>
      <div class="v-preview__details">
        <div class="v-preview__details-size">{{ image.dimensions }}</div>
        <div class="v-preview__details-ext">{{ image.ext }}</div>
      </div>
    </div>
    <div class="v-preview__title">{{ image.name }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

interface Image {
  src: string;
  name: string;
  modifiedTime: string;
  size: string;
}

@Component
export default class VPreview extends Vue {
  @Prop()
  image?: Image;
}
</script>

<style scoped>
.v-preview {
  height: 140px;
  margin: 6px;
  width: 134px;
}

.v-preview__body {
  border-radius: 10px;
  border: 1px solid #a0a0a0;
  height: 116px;
  padding: 7px 4px 0 4px;
  width: 130px;
}

/* Image */
.v-preview__image {
  align-items: center;
  display: flex;
  height: 96px;
  justify-content: center;
}

.v-preview__image-src {
  max-width: 130px;
  max-height: 90px;
}

/* Details */
.v-preview__details {
  align-items: center;
  color: #505050;
  display: flex;
  font-size: 12px;
  height: 12px;
  justify-content: space-around;
  margin-top: 4px;
  width: 126px;
}

.v-preview__details-ext {
  text-transform: uppercase;
}

/* Title */
.v-preview__title {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
}

.selected {
  border: 5px solid #a0a0a0;
  padding: 0;
}
</style>
