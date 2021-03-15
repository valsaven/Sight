<template>
  <div class="remove">
    <button
      class="button remove__btn"
      :class="{ 'remove__btn_danger': !deleteToRecycleBin }"
      @click="$emit('toggle-delete-mode')"
    >
      Delete
    </button>

    <label for="delete-to-recycle-bin">Remove files to recycle bin</label>
    <input
      id="delete-to-recycle-bin"
      v-model="deleteToRecycleBin"
      type="checkbox"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DeleteBlock extends Vue {
  @Prop({
    type: Boolean,
    default: true,
  })
  deleteToRecycleBin?: boolean;
}
</script>

<style scoped>
.remove__btn {
  background-color: #ff003b;
  color: #fff;
}
</style>
