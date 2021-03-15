<template>
  <div class="short-info">
    <span class="short-info__files-number">
      {{ total }} image(s) | {{ total }} image(s) selected
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ShortInfoBlock extends Vue {
  @Prop({
    type: Number,
    default: 0,
  })
  total?: number;
}
</script>

<style scoped>

</style>
