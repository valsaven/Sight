<script setup lang="ts">
import { ref, Ref } from 'vue';

import AppBar from './components/AppBar.vue';
import ImageList from './components/ImageList/ImageList.vue';
import PreviewBlock from './components/PreviewBlock.vue';
import VLoader from './components/VLoader.vue';

import { type Image, type Images } from './types';

const isLoading = ref(false);
const activeImage: Ref<Image | undefined> = ref(undefined);
const images: Ref<Images> = ref([]);
const selectedImages: Ref<Images> = ref([]);
const total = ref(0);
const deleteToRecycleBin = ref(true);

function setActiveImage(image: Image | undefined): void {
  activeImage.value = image;
}

function setTotal(newTotal: number): void {
  total.value = newTotal;
}

function setImages(newImages: Images): void {
  images.value = newImages;
}

function onLoadImages(newImages: Images): void {
  isLoading.value = true;

  setActiveImage(undefined);

  try {
    setTotal(newImages.length);

    setImages(newImages);

    if (images.value.length !== 0) {
      setActiveImage(images.value[0]);
    }
  } catch (err) {
    throw new Error(JSON.stringify(err));
  } finally {
    isLoading.value = false;
  }
}

function onClearImages(): void {
  try {
    setImages([]);
    setTotal(0);
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

function onToggleDeleteMode(val: boolean): void {
  deleteToRecycleBin.value = !val;
}

async function onDeleteImages(): Promise<void> {
  console.log('Deleting images:', selectedImages.value);
  console.log('Delete to recycle bin:', deleteToRecycleBin.value);


  if (deleteToRecycleBin.value) {
    // Safe delete (to recycle bin)

    // await trash([...selectedImages.value.map(image => image.src)]);
    // this.search(); // Update after deleting
  } else if (!deleteToRecycleBin.value) {
    // Permanently delete
    selectedImages.value.forEach(async (selectedImage: Image) => {
      console.log('Deleting image:', selectedImage);
      // window.fs.unlinkSync(selectedImage.src);
    });

    // this.search(); // Update after deleting
  } else {
    console.log('Error in deleting process.');
  }
}

function onOpenImage(image: Image): void {
  setActiveImage(image);
}

function toggleSingleImageSelect(image: Image): void {
  const index = images.value.findIndex((tempImage) => tempImage.hash === image.hash);

  if (index > -1) {
    images.value[index].selected = !images.value[index].selected;
  }
}

function onSelectImage(image: Image): void {
  const index = selectedImages.value.findIndex((selectedImage) => selectedImage.hash === image.hash);

  if (index > -1) {
    selectedImages.value.splice(index, 1);
  } else {
    selectedImages.value.push(image);
  }

  toggleSingleImageSelect(image);
}
</script>

<template>
  <div class="sight">
    <AppBar :images="images" :delete-to-recycle-bin="deleteToRecycleBin" @loading="isLoading = $event"
      @toggle-delete-mode="onToggleDeleteMode" @load-images="onLoadImages" @clear-images="onClearImages"
      @delete-images="onDeleteImages" />

    <main v-show="!isLoading">
      <ImageList :active-image="activeImage" :images="images" :selected-images="selectedImages"
        @open-image="onOpenImage" @select-image="onSelectImage" />
      <PreviewBlock :active-image="activeImage" />
    </main>

    <VLoader v-if="isLoading" class="loader" />
  </div>

</template>

<style scoped>
.sight {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
