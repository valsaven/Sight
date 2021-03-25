<template>
  <div id="app">
    <div id="wrapper">
      <app-bar />
      <main>
        <v-image-list />
        <v-preview />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppBar from './components/AppBar/index.vue';

import VImageList from './views/ImageList/VImageList.vue';
import VPreview from './views/Preview/VPreview.vue';

@Component({
  components: {
    AppBar,
    VImageList,
    VPreview,
  },
})
export default class App extends Vue {
  public images!: [];

  public total = 0;

  //   import { Action, Mutation, State } from 'vuex-simple';
  // import { Image, Images } from '@/types/shared';
  //
  // export default class RootStore {
  //   @State()
  //   public activeImage?: Image;
  //
  //   @State()
  //   public images: Images = [];
  //
  //   @State()
  //   public isModalOpened = false;
  //
  //   @State()
  //   public selectedImages: Images = [];
  //
  //   @State()
  //   public total = 0;
  //
  //   @Mutation()
  //   public setActiveImage(image: Image): void {
  //     this.activeImage = image;
  //   }
  //
  //   @Mutation()
  //   public setTotal(total: number): void {
  //     this.total = total;
  //   }
  //
  //   @Mutation()
  //   public setImages(images: Images): void {
  //     this.images = images;
  //   }
  //
  //   @Mutation()
  //   public reverseImageSelection(imageId: number): void {
  //     return this.images.forEach((image: Image) => {
  //       if (image.id === imageId) {
  //         image.selected = !image.selected;
  //       }
  //     });
  //   }
  //
  //   @Action()
  //   public toggleImageSelection(imageId: number): void {
  //     this.reverseImageSelection(imageId);
  //   }
  //
  //   @Action()
  //   public toggleModalWindow(): void {
  //     this.isModalOpened = !this.isModalOpened;
  //   }
  // }
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
