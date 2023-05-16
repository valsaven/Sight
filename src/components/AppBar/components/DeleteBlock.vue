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
  <div class="delete-block remove">
    <button
      type="button"
      class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      :class="{
        'bg-white': deleteToRecycleBin,
        'bg-red-600 text-white': !deleteToRecycleBin,
      }"
      @click="$emit('delete-images')"
    >
      Delete
    </button>

    <div class="flex items-center">
      <label
        for="delete-to-recycle-bin"
        class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >Move to Recycle Bin</label>

      <input
        id="delete-to-recycle-bin"
        v-model="deleteToRecycleBin"
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        @click="toggleDeleteMode"
      >
    </div>
  </div>
</template>
