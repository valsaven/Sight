<template>
  <div id="app">
  <v-app>
    <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="tree">
            <v-container fluid>
              <v-text-field type="text" v-model="imagesPath" @keyup.enter="search" placeholder="Enter the path..."></v-text-field>
              <v-container fluid>
                <v-chip disabled>{{total}}</v-chip>
                <v-btn depressed color="primary" id="search" @click="search">Search</v-btn>
              </v-container>
            </v-container>
            <v-container fluid>
              <v-layout row wrap class="light--text">
                <v-flex xs9>
                  <v-chip disabled :class="{ 'success': deleteToRecycleBin, 'error': !deleteToRecycleBin }" text-color="white">Delete images to recycle bin</v-chip>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-checkbox color="success" v-model="deleteToRecycleBin"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
        </div>
      </div>

      <div class="right-side">
        <div class="preview">
          <div class="image" :class="{ 'image-active': image.active }" v-for="image in images" v-on:click="makeImageActive(image.id)">
            <v-tooltip bottom light color="blue-grey darken-2">
              <img :src="image.src" width="180px" alt="image" slot="activator">
              <div>
                <span>{{image.name}}</span><br>
                <span>{{image.modifiedTime}}</span><br>
                <span>{{image.size}}</span>
              </div>
            </v-tooltip>
            <p class="image-name">{{image.name}}</p>
          </div>
        </div>
        </div>
      </main>
    </div>
  </v-app>
</div>
</template>

<script>
import moment from 'moment';

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
    humanFileSize(size) {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      const pow = 1024 ** i;
      return `${(size / pow).toFixed(2) * 1} ${
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
      }`;
    },
    search() {
      const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

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
            const fileStats = fs.statSync(`${this.imagesPath}\\${fileName}`);

            const image = {
              id: i,
              src: `${this.imagesPath}\\${fileName}`,
              name: fileName,
              ext: fileExt,
              size: this.humanFileSize(fileStats.size),
              modifiedTime: moment(fileStats.mtimeMs).format(
                'DD MMM YYYY, HH:mm:ss',
              ),
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
