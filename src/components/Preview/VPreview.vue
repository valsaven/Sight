<template>
  <div class="v-preview">
    <img
      v-if="activeImage"
      class="v-preview__image"
      :src="`safe-file-protocol://${activeImage.src}`"
      alt="image"
    >
    <img
      v-else
      svg-inline
      class="v-preview__blank"
      src="./assets/portrait-black-18dp.svg"
      alt="image"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Image } from '../../types';

@Component
export default class VPreview extends Vue {
  @Prop()
  activeImage?: Image;
}
</script>

<style scoped>
.v-preview {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
}

.v-preview__image {
  max-height: 100%;
  max-width: 100%;
}

.v-preview__blank {
  height: 350px;
  width: 350px;
}
</style>
