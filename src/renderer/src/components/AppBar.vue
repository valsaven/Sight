<script setup lang="ts">
import { type Images } from '../types';
import { onMounted, PropType, reactive, ref } from 'vue';

const props = defineProps({
  deleteToRecycleBin: {
    type: Boolean,
    required: true,
  },

  images: {
    type: Array as PropType<Images>,
    required: true,
  },
});

const emit = defineEmits(['loading', 'load-images', 'clear-images', 'delete-images']);


const deleteToRecycleBin = ref(true);

const imagesPath = ref('');

function toggleDeleteMode(): void {
  deleteToRecycleBin.value = !deleteToRecycleBin.value;
}

function openInfo(): void {
  const versions = reactive({ ...window.electron.process.versions });
  const message = `Sight v0.2.0

A simple image viewer built with Electron and Vue.js.

  Electron v${versions.electron}
  Chromium v${versions.chrome}
  Node v${versions.node}
`;

  alert(message);
}

async function getImages(): Promise<void> {
  emit('loading', true);

  if (!imagesPath.value) {
    alert('Error message:\nThe path is empty!');
    return;
  }

  const result = await window.electron.getImages(imagesPath.value);

  if (!result.success) {
    alert(`Error message:\n${result.error}`);
    return;
  }

  emit('load-images', result.images);
  emit('loading', false);
}

async function goUp(): Promise<void> {
  const result = await window.electron.goUpDirectory(imagesPath.value);

  if (!result.success) {
    alert(`Error when moving up: ${result.error}`);
    return;
  }

  imagesPath.value = result.path;

  // TODO: Consider the option of disabling the "Up" button if isRoot is true
  if (result.isRoot) {
    console.log('The root of the file system has been reached.');
  }

  // Reload the images from the new folder
  getImages();
}

onMounted(async () => {
  const result = await window.electron.getDefaultImagesPath();

  if (result.success && result.path) {
    imagesPath.value = result.path;
    // Load images from this folder immediately
    getImages();
  } else {
    // Fallback in case of an error
    imagesPath.value = '';
    if (result.error) {
      console.error('Failed to get the default path:', result.error);
    }
  }
});
</script>

<template>
  <header>
    <button class="button search__btn" type="button" @click="goUp">Up</button>

    <input v-model="imagesPath" type="text" class="search__input" placeholder="Enter the path..."
      @keyup.enter="getImages" />

    <!-- IMAGES COUNT -->
    <span class="images-count">{{ props.images.length }} image(s)</span>

    <!-- DELETE -->
    <label>
      <input id="delete-to-recycle-bin" v-model="deleteToRecycleBin" type="checkbox" @click="toggleDeleteMode" />
      Delete files to recycle bin
    </label>

    <button class="button remove__btn" type="button" :class="{ 'remove__btn--danger': !deleteToRecycleBin }"
      @click="$emit('delete-images')">
      Delete
    </button>

    <!-- INFO -->
    <button class="button info__button" type="button" @click="openInfo">

      <svg class="info__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path
          d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"
          fill="currentColor" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
.images-count {
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 14px;
  padding: 8px 16px;
}

.remove__btn--danger {
  background-color: var(--error);
  color: var(--text);
}

.info__button {
  align-items: center;
  color: var(--text-secondary);
  display: flex;
  height: 34px;
  justify-content: center;
  padding: 0;
  width: 34px;
}

.info__button:hover {
  color: var(--selected);
}

.info__icon {
  height: 24px;
  transition: all 0.3s ease;
  width: 24px;
}
</style>
