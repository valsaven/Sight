<template>
  <v-app id="app">
    <div id="wrapper">
      <main>
        <div class="left-side">
          <div class="tree">
            <v-container fluid>
              <v-text-field
                v-model="imagesPath"
                placeholder="Enter the path..."
                type="text"
                @keyup.enter="search"
              />
              <v-container fluid>
                <v-chip
                  disabled
                  v-text="total"
                />
                <v-btn
                  id="search"
                  depressed
                  color="primary"
                  @click="search"
                >
                  Search
                </v-btn>
              </v-container>
            </v-container>
            <v-container fluid>
              <v-layout
                row
                wrap
                class="light--text"
              >
                <v-flex xs9>
                  <v-chip
                    :class="{ 'success': deleteToRecycleBin, 'error': !deleteToRecycleBin }"
                    disabled
                    text-color="white"
                  >
                    Delete images to recycle bin
                  </v-chip>
                </v-flex>
                <v-flex
                  xs2
                  offset-xs1
                >
                  <v-checkbox
                    v-model="deleteToRecycleBin"
                    color="success"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </div>

        <div class="right-side">
          <div class="preview">
            <v-image
              v-for="(image, index) in images"
              :image="image"
              :key="index"
            />
          </div>
        </div>
      </main>
    </div>
  </v-app>
</template>

<script lang="ts">
import { format } from 'date-fns';
import os from 'os';

import VImage from './components/VImage.vue';

const fs = require('fs');
const trash = require('trash');

export default {
  name: 'Watcher',
  components: {
    vImage: VImage,
  },
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
  created() {
    window.addEventListener('keyup', this.hotKeys);
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
            const isWindows = os.platform() === 'win32';

            const fileStats = isWindows ? fs.statSync(`${this.imagesPath}\\${fileName}`) : fs.statSync(`${this.imagesPath}/${fileName}`);

            const image = {
              id: i,
              src: isWindows ? `${this.imagesPath}\\${fileName}` : `${this.imagesPath}/${fileName}`,
              name: fileName,
              ext: fileExt,
              size: this.humanFileSize(fileStats.size),
              modifiedTime: format(fileStats.mtimeMs, 'DD MMM YYYY, HH:mm:ss'),
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); /* TODO: Remove */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.main {
  height: 90%;
}

.main {
  display: flex;
}

.tree {
  background-color: #b7d7e8;
  height: 100%;
  overflow-y: auto;
}

.preview {
  background-color: #cfe0e8;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-y: auto;
}

.image {
  align-items: center;
  border: 2px solid #f00; /* TODO: Remove */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.image-selected {
  border: 2px solid #009;
}

.image-active {
  border: 4px solid #009;
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
  height: 100vh;
  justify-content: space-between;
  width: 100vw;
}

main > .left-side {
  flex-basis: 20%;
}

main > .right-side {
  flex-basis: 80%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.preview p {
  color: black;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}

.preview button {
  background-color: #4fc08d;
  border-radius: 2em;
  border: 1px solid #4fc08d;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: .8em;
  outline: none;
  padding: .75em 2em;
  transition: all .15s ease;
}

.preview button.alt {
  background-color: transparent;
  color: #42b983;
}

// 1
@media only screen and (max-width: 679px)  {}

// 2
@media only screen and (max-width: 899px)  {}

// 3
@media only screen and (max-width: 1139px)  {}

// 4
@media only screen and (max-width: 1399px)  {}

// 5
@media only screen and (max-width: 1679px)  {}

// 6
@media only screen and (max-width: 1959px)  {}

// 7
@media only screen and (max-width: 2239px)  {}
</style>
