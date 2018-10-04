<template>
  <div
    :class="{ 'image-active': selectedImages.includes(image.id) }"
    class="image"
    @click.ctrl="toggleImageSelection(image.id)"
  >
    <v-tooltip
      bottom
      light
      color="blue-grey darken-2"
    >
      <img
        slot="activator"
        :src="`file:///${image.src}`"
        width="180px"
        alt="image"
      >
      <div>
        <span>{{ image.name }}</span><br>
        <span>{{ image.modifiedTime }}</span><br>
        <span>{{ image.size }}</span>
      </div>
    </v-tooltip>
    <p class="image-name">{{ image.name }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VImage',
  props: {
    image: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['selectedImages']),
  },
  methods: {
    ...mapMutations(['toggleImageSelection']),
  },
};
</script>
