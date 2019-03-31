<template>
  <div class="preview-block">
    <ul class="preview-block__images-list">
      <li
        v-for="(image, index) in images"
        :key="index"
      >
        <v-image :image="image"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VImage from './VImage.vue';

const trash = require('trash');

export default {
  name: 'PreviewBlock',
  components: {
    vImage: VImage,
  },
  created() {
    window.addEventListener('keyup', this.hotKeys);
  },
  computed: {
    ...mapState(['images', 'selectedImages']),
  },
  methods: {
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
.preview-block {
  flex-basis: 80%;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.preview-block__images-list {
  display: flex;
  flex-wrap: wrap;
}

/* 1 */
@media only screen and (max-width: 679px)  {}

/* 2 */
@media only screen and (max-width: 899px)  {}

/* 3 */
@media only screen and (max-width: 1139px)  {}

/* 4 */
@media only screen and (max-width: 1399px)  {}

/* 5 */
@media only screen and (max-width: 1679px)  {}

/* 6 */
@media only screen and (max-width: 1959px)  {}

/* 7 */
@media only screen and (max-width: 2239px)  {}
</style>
