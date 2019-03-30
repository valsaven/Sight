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
        <span v-text="image.name"/><br>
        <span v-text="image.modifiedTime"/><br>
        <span v-text="image.size"/>
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
