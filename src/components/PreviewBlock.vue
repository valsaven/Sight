<template>
  <div
    class="preview-block__wrapper"
    v-model="isModalOpened"
  >
    <div class="preview-block">
      <ul class="preview-block__images-list">
        <v-preview
          v-for="(image, index) in images"
          :key="index"
          :image="image"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VImage from './VImage.vue';
import VPreview from './VPreview.vue';

const trash = require('trash');

export default {
  name: 'PreviewBlock',
  components: {
    vImage: VImage,
    vPreview: VPreview,
  },
  computed: {
    ...mapState([
      'activeImage',
      'images',
      'isModalOpened',
      'selectedImages',
    ]),
    isModalOpened: {
      get() {
        return this.$store.state.isModalOpened;
      },
      set() {
        this.$store.commit('setItem', {
          item: 'isModalOpened',
          value: false,
        });
      },
    },
  },
  watch: {
    activeImage() {
      console.log(this.activeImage);
    },
  },
  created() {
    window.addEventListener('keyup', this.hotKeys);
  },
  methods: {
    ...mapActions([
      'openImage',
    ]),
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
    },
    // TODO: Check
    makeImageActive(id) {
      console.log(id);
      this.changeActiveImage(id);
    },
    toggleSelection(id) {
      console.log(id);
    },
    changeActiveImage(id) {
      this.activeImage.active = false;
      this.activeImage = this.images[id];
      this.activeImage.active = true;
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style scoped>
.preview-block__wrapper {
  height: 100%;
}

.preview-block {
  flex-basis: 80%;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.preview-block__images-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
</style>
