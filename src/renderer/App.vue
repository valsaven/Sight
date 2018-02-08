<template>
  <div id="app">
    <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="tree">
          <input type="text" v-model="imagesPath" @keyup.enter="search" placeholder="Enter the path...">
          <button id="search" @click="search">Search</button>
          <p class="total">{{total}}</p>
        </div>
      </div>

      <div class="right-side">
        <div class="preview">
          <div class="image" v-for="image in images">
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

export default {
  name: 'watcher',
  created() {
    window.addEventListener('keyup', this.hotKeys);
  },
  components: {},
  data() {
    return {
      imagesPath: '',
      images: [],
      activeImage: null,
      selectedImages: [],
      total: 0,
    };
  },
  methods: {
    hotKeys(e) {
      switch (e.which) {
        case 37: // left
          console.log('left');
          break;

        case 38: // up
          console.log('up');
          break;

        case 39: // right
          console.log('right');
          break;

        case 40: // down
          console.log('down');
          break;

        case 46: // delete
          console.log('delete');
          console.log(this.activeImage);
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
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
              src: `${this.imagesPath}\\${fileName}`,
              name: fileName,
              ext: fileExt,
              size: 0, // soon
              selected: false,
            };

            this.images.push(image);
            this.total += 1;
          }
        }

        [this.activeImage] = this.images;
      });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); /* TODO: Remove */

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
  border: 2px solid red; /* TODO: Remove */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.image-selected {
  border: 2px solid #000099;
}

.image-active {
  border: 4px solid #000099;
}

/**/
body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
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
  font-size: 0.8em;
  outline: none;
  padding: 0.75em 2em;
  transition: all 0.15s ease;
}

.preview button.alt {
  background-color: transparent;
  color: #42b983;
}
</style>
