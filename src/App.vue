<template>
  <div id="app">
    <div id="wrapper">
      <app-bar
        @load-images="onLoadImages"
        @clear-images="onClearImages"
      />
      <main>
        <image-list
          :active-image="activeImage"
          :images="images"
          :is-modal-opened="isModalOpened"
          :selected-images="selectedImages"
          @open-image="onOpenImage"
        />
        <preview-block :active-image="activeImage" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import {
  Image,
  Images,
} from './types';

import AppBar from './components/AppBar/index.vue';

import ImageList from './components/ImageList/ImageList.vue';
import PreviewBlock from './components/PreviewBlock/index.vue';

@Component({
  components: {
    AppBar,
    ImageList,
    PreviewBlock,
  },
})
export default class App extends Vue {
  public activeImage: Image | null = null;

  public images: Images = [];

  public isModalOpened = false;

  public selectedImages: Images = [];

  public total = 0;

  public setActiveImage(image: Image): void {
    this.activeImage = image;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public setImages(images: Images): void {
    this.images = images;
  }

  public reverseImageSelection(imageId: number): void {
    this.images.forEach((image: Image) => {
      if (image.id === imageId) {
        image.selected = !image.selected;
      }
    });
  }

  public toggleImageSelection(imageId: number): void {
    this.reverseImageSelection(imageId);
  }

  public toggleModalWindow(): void {
    this.isModalOpened = !this.isModalOpened;
  }

  onLoadImages(images: Images): void {
    try {
      this.setTotal(images.length);

      if (this.images.length !== 0) {
        this.setActiveImage(this.images[0]);
      }

      this.setImages(images);
    } catch (err) {
      console.error(err);
    }
  }

  onClearImages(): void {
    try {
      this.setImages([]);
      this.setTotal(0);
    } catch (err) {
      console.error(err);
    }
  }

  onOpenImage(image: Image): void {
    this.setActiveImage(image);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  margin: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, .9) 100%
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
