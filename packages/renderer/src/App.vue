<template>
  <div class="sight">
    <div class="wrapper">
      <AppBar
        :images="images"
        :delete-to-recycle-bin="deleteToRecycleBin"
        @toggle-delete-mode="onToggleDeleteMode"
        @load-images="onLoadImages"
        @clear-images="onClearImages"
        @delete-images="onDeleteImages"
      />
      <main>
        <ImageList
          :active-image="activeImage"
          :images="images"
          :selected-images="selectedImages"
          @open-image="onOpenImage"
          @select-image="onSelectImage"
        />
        <PreviewBlock :active-image="activeImage"/>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import trash from 'trash';
import { defineComponent } from 'vue'

import {
  Image,
  Images,
} from './types';
//
import AppBar from './components/AppBar/index.vue';
//
import ImageList from './components/ImageList/ImageList.vue';
import PreviewBlock from './components/PreviewBlock/index.vue';

export default defineComponent({
  name: "SightApp",
  components: {
    AppBar,
    ImageList,
    PreviewBlock,
  },
  data() {
    return {
      activeImage: null as Image | null,
      images: [] as Images,
      selectedImages: [] as Images,
      total: 0,
      deleteToRecycleBin: true,
    }
  },
  methods: {

    setActiveImage(image: Image): void {
      this.activeImage = image;
    },

    setTotal(total: number): void {
      this.total = total;
    },

    setImages(images: Images): void {
      this.images = images;
    },

    onLoadImages(images: Images): void {
      try {
        this.setTotal(images.length);

        if (this.images.length !== 0) {
          this.setActiveImage(this.images[0]);
        }

        this.setImages(images);
      } catch (err) {
        throw new Error(err);
      }
    },

    onClearImages(): void {
      try {
        this.setImages([]);
        this.setTotal(0);
      } catch (err) {
        throw new Error(err);
      }
    },

    onToggleDeleteMode(val: boolean): void {
      this.deleteToRecycleBin = !val;
    },

    onDeleteImages(): void {
      this.selectedImages.forEach((selectedImage: Image) => {
        if (this.deleteToRecycleBin) {
          // Safe delete (to recycle bin)
          // FIXME: Fix detele to recucle bin
          // trash(selectedImage.src).then(() => {
          //   console.log('Images were successfully deleted.');
          //   // this.search(); // Update after deleting
          // });
        } else if (!this.deleteToRecycleBin) {
          // Permanently delete
          window.fs.unlinkSync(selectedImage.src);
          // this.search(); // Update after deleting
        } else {
          console.log('Error in deleting process.');
        }
      });
    },

    onOpenImage(image: Image): void {
      this.setActiveImage(image);
    },

    toggleSingleImageSelect(image: Image): void {
      const index = this.images.findIndex((tempImage) => tempImage.md5 === image.md5);

      if (index > -1) {
        this.images[index].selected = !this.images[index].selected;
      }
    },

    onSelectImage(image: Image): void {
      const index = this.selectedImages
        .findIndex((selectedImage) => selectedImage.md5 === image.md5);

      if (index > -1) {
        this.selectedImages.splice(index, 1);
      } else {
        this.selectedImages.push(image);
      }

      this.toggleSingleImageSelect(image);
    }
  },
})
</script>

<style>
.sight {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
.sight {
  margin: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

.wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  width: 100vw;
}

main {
  display: flex;
  height: calc(100% - 51px);
  width: 100vw;
  flex-direction: row;
}
</style>
