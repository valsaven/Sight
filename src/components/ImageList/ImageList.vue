<template>
  <div
    class="v-image-list__wrapper"
  >
    <div
      v-if="images.length > 0"
      class="v-image-list"
    >
      <RecycleScroller
        v-slot="{ item }"
        class="scroller"
        :items="images"
        :item-size="8"
        key-field="id"
      >
        <v-thumbnail
          :image="item"
          @open-image="onOpenImage"
          @select-image="onSelectImage"
        />
      </RecycleScroller>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Emit,
  Prop,
  Watch,
} from 'vue-property-decorator';
import trash from 'trash';

import fs from 'fs';
import { Image, Images } from '../../types';
import VImage from './components/VImage.vue';
import VThumbnail from './components/VThumbnail.vue';

@Component({
  components: {
    VImage,
    VThumbnail,
  },
})
export default class ImageList extends Vue {
  @Prop({
    type: Image || null,
  })
  activeImage: Image | null = null;

  @Prop({
    type: Boolean,
  })
  isModalOpened = false;

  @Prop({
    type: Array,
  })
  selectedImages: Images = [];

  @Prop({
    type: Array,
  })
  images: Images = [];

  @Watch('activeImage')
  onActiveImageChanged(value: Image, oldValue: Image): void {
    console.log(value);
    console.log(oldValue);
    console.log(this.activeImage);
  }

  // COMPUTED
  // get isModalOpened(): void {
  //   return this.$store.state.isModalOpened;
  // }
  //
  // set isModalOpened(value) {
  //   this.$store.commit('setItem', {
  //     item: 'isModalOpened',
  //     value: false,
  //   });
  // }

  // METHODS
  makeImageActive(id: number): void {
    console.log(id);
    this.changeActiveImage(id);
  }

  // eslint-disable-next-line class-methods-use-this
  toggleSelection(id: number): void {
    console.log(id);
  }

  changeActiveImage(id: number): void {
    this.activeImage.active = false;
    this.activeImage = this.images[id];
    this.activeImage.active = true;
  }

  open(link): void {
    this.$electron.shell.openExternal(link);
  }

  hotKeys(e) {
    switch (e.which) {
      case 37: // left
        console.log('left');
        if (this.activeImage.id === 0) {
          console.log('This is already the first image.');
          break;
        } else {
          this.changeActiveImage(this.activeImage.id - 1);
        }

        break;

      case 38: // up
        console.log('up');
        break;

      case 39: // right
        console.log('right');
        if (this.activeImage.id === this.images.length - 1) {
          console.log('This is already the last image.');
          break;
        } else {
          this.changeActiveImage(this.activeImage.id + 1);
        }

        break;

      case 40: // down
        console.log('down');
        break;

      case 46: // delete
        // Debug data
        console.log('delete');
        console.log(this.activeImage);
        console.log(this.images);

        if (this.deleteToRecycleBin) {
          // Safe delete (to recycle bin)
          trash([this.activeImage.src]).then(() => {
            console.log('Images were successfully deleted.');
            this.search(); // Update after deleting
          });
        } else if (!this.deleteToRecycleBin) {
          // Permanently delete
          fs.unlinkSync(this.activeImage.src);
          this.search(); // Update after deleting
        } else {
          console.log('Error in deleting process.');
        }

        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }

  @Emit('open-image')
  onOpenImage(val: Image): Image {
    return val;
  }

  // Ctrl+Click
  onSelectImage(val: Image): void {
    console.log(val);
  }

  // HOOKS
  created(): void {
    window.addEventListener('keyup', this.hotKeys);
  }

  // computed: {
  //   ...mapState([
  //     'activeImage',
  //     'isModalOpened',
  //     'selectedImages',
  //   ]),
  //
  // },
}
</script>

<style scoped>
.v-image-list__wrapper {
  height: 100%;
  width: 400px;
}

.v-image-list {
  flex-basis: 80%;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.v-image-list__images-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
</style>
