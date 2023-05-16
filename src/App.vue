<script setup lang="ts">
import { ref, Ref } from 'vue';

import AppBar from './components/AppBar/AppBar.vue';
import ImageList from './components/ImageList/ImageList.vue';
import PreviewBlock from './components/PreviewBlock.vue';

import {
  Image,
  Images,
} from './types';

const activeImage: Ref<Image | null> = ref(null);
const images: Ref<Images> = ref([]);
const selectedImages: Ref<Images> = ref([]);
const total = ref(0);
const deleteToRecycleBin = ref(true);

function setActiveImage(image: Image): void {
  activeImage.value = image;
}

function setTotal(newTotal: number): void {
  total.value = newTotal;
}

function setImages(newImages: Images): void {
  images.value = newImages;
}

function onLoadImages(newImages: Images): void {
  try {
    setTotal(newImages.length);

    if (images.value.length !== 0) {
      setActiveImage(images.value[0]);
    }

    setImages(newImages);
  } catch (err) {
    throw new Error(err);
  }
}

function onClearImages(): void {
  try {
    setImages([]);
    setTotal(0);
  } catch (err) {
    throw new Error(err);
  }
}

function onToggleDeleteMode(val: boolean): void {
  deleteToRecycleBin.value = !val;
}

function onDeleteImages(): void {
  selectedImages.value.forEach((selectedImage: Image) => {
    if (deleteToRecycleBin.value) {
      // Safe delete (to recycle bin)
      // FIXME: Fix detele to recucle bin
      // trash(selectedImage.src).then(() => {
      //   console.log('Images were successfully deleted.');
      //   // this.search(); // Update after deleting
      // });
    } else if (!deleteToRecycleBin.value) {
      // Permanently delete
      window.fs.unlinkSync(selectedImage.src);
      // this.search(); // Update after deleting
    } else {
      console.log('Error in deleting process.');
    }
  });
}

function onOpenImage(image: Image): void {
  setActiveImage(image);
}

function toggleSingleImageSelect(image: Image): void {
  const index = images.value.findIndex((tempImage) => tempImage.md5 === image.md5);

  if (index > -1) {
    images.value[index].selected = !images.value[index].selected;
  }
}

function onSelectImage(image: Image): void {
  const index = selectedImages.value
    .findIndex((selectedImage) => selectedImage.md5 === image.md5);

  if (index > -1) {
    selectedImages.value.splice(index, 1);
  } else {
    selectedImages.value.push(image);
  }

  toggleSingleImageSelect(image);
}
</script>

<template>
  <div class="w-screen h-screen bg-gray-50 antialiased flex flex-col">
    <AppBar
      :images="images"
      :delete-to-recycle-bin="deleteToRecycleBin"
      @toggle-delete-mode="onToggleDeleteMode"
      @load-images="onLoadImages"
      @clear-images="onClearImages"
      @delete-images="onDeleteImages"
    />

    <main class="h-full flex flex-row max-h-full overflow-hidden">
      <ImageList
        :active-image="activeImage"
        :images="images"
        :selected-images="selectedImages"
        @open-image="onOpenImage"
        @select-image="onSelectImage"
      />
      <PreviewBlock :active-image="activeImage" />
    </main>
  </div>
</template>

<style>
@import "index.css";
</style>
