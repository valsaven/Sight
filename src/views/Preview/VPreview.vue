<template>
  <div class="v-preview">
    PREVIEW
    <img
      v-if="image"
      class="v-preview__image"
      :src="`safe-file-protocol://${image.src}`"
      alt="image"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Image } from '@/types';

@Component
export default class VPreview extends Vue {
  @Prop()
  image?: Image;
}
</script>

<style scoped>
.v-preview {
}

.v-preview__image {
}
</style>
