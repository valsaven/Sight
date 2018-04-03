<template>
  <div id="app">
    <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="tree">
          <input type="text" v-model="imagesPath" @keyup.enter="search" placeholder="Enter the path...">
          <button id="search" @click="search">Search</button>
          <p class="total">{{total}}</p>
          Delete images to recycle bin <input type="checkbox" v-model="deleteToRecycleBin">
        </div>
      </div>

      <div class="right-side">
        <div class="preview">
          <div class="image" :class="{ 'image-active': image.active }" v-for="image in images" v-on:click="makeImageActive(image.id)">
            <img :src="image.src" width="180px" alt="image">
            <p class="image-name" :title="image.name">{{image.name}}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>
</template>

<script>
const fs = require('fs');
const trash = require('trash');

export default {
  name: 'watcher',
  created() {
    window.addEventListener('keyup', this.hotKeys);
  },
  components: {},
  data() {
    return {
      imagesPath: '',
      activeImage: null,
      deleteToRecycleBin: true,
      images: [],
      selectedImages: [],
      total: 0,
    };
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
    makeImageActive(id) {
      console.log(id);
      this.changeActiveImage(id);
    },
    changeActiveImage(id) {
      this.activeImage.active = false;
      this.activeImage = this.images[id];
      this.activeImage.active = true;
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    search() {
      const imageTypes = ['gif', 'jpg', 'jpeg', 'png'];

      this.images = [];
      this.total = 0;
      console.log('Start search...'); // TODO: Remove console.log

      // Empty path check
      if (!this.imagesPath) {
        alert('Error message:\nThe path is empty!');
        return;
      }

      fs.readdir(this.imagesPath, (err, dir) => {
        // Wrong path check
        if (err) {
          alert(`Error message:\n${err}`);
          return;
        }

        for (let i = 0; i < dir.length; i += 1) {
          const fileName = dir[i];
          const fileExt = fileName
            .split('.')
            .pop()
            .toLowerCase();

          if (imageTypes.includes(fileExt)) {
            const image = {
              id: i,
              src: `${this.imagesPath}\\${fileName}`,
              name: fileName,
              ext: fileExt,
              size: 0, // soon
              selected: false,
              active: false,
            };

            this.images.push(image);
            this.total += 1;
          }
        }

        if (this.images.length !== 0) {
          [this.activeImage] = this.images;
          this.activeImage.active = true;
        }
      });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); /* TODO: Remove */
@import './style.css';
</style>
