<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['delete-images']);

const deleteToRecycleBin = ref(true);

function toggleDeleteMode() {
  // this.$emit('toggle-delete-mode');
  deleteToRecycleBin.value = !deleteToRecycleBin.value;
}
</script>

<template>
  <div class="remove">
    <button
      class="button remove__btn"
      type="button"
      :class="{ remove__btn_danger: !deleteToRecycleBin }"
      @click="$emit('delete-images')"
    >
      Delete
    </button>

    <label for="delete-to-recycle-bin">Delete files to recycle bin</label>
    <input
      id="delete-to-recycle-bin"
      v-model="deleteToRecycleBin"
      type="checkbox"
      @click="toggleDeleteMode"
    >
  </div>
</template>

<style scoped>
.remove__btn_danger {
  background-color: #ff003b;
  color: #fff;
}
</style>
