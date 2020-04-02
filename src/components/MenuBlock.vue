<template>
  <div class="menu"/>
</template>

<script lang="ts">
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MenuBlock',
  computed: {
    ...mapState([
      'images',
      'isModalOpened',
      'selectedImages',
      'total',
    ]),
  },
  methods: {
    ...mapMutations(['setItem']),
    ...mapActions([
      'loadImages',
      'clearImages',
      'getImages',
    ]),
  },
};
</script>
