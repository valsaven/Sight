<template>
  <div
    class="v-thumbnail"
    @click="onClick"
  >
    <!-- Image -->
    <div class="v-thumbnail__image-container">
      <img
        class="v-thumbnail__image"
        :src="`safe-file-protocol://${image.src}`"
        alt="image"
      >
    </div>

    <!-- Description -->
    <div class="v-thumbnail__description">
      <div class="v-thumbnail__title">
        {{ image.name }}
      </div>

      <div class="v-thumbnail__details">
        <div class="v-thumbnail__details-size">
          {{ image.dimensions }}
        </div>
        <div class="v-thumbnail__details-ext">
          {{ image.ext }}
        </div>
      </div>
    </div>
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

  onClick() {
    console.log(this.image);
  }
}
</script>

<style scoped>
.v-thumbnail {
  align-items: center;
  border: 1px solid #a0a0a0;
  display: flex;
  margin: 0 auto;
  width: 300px;
}

/* Image */
.v-thumbnail__image-container {
  align-items: center;
  display: flex;
  justify-content: center;
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
  width: 126px;
}

.v-thumbnail__details-ext {
  text-transform: uppercase;
}

/* Title */
.v-thumbnail__title {
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
