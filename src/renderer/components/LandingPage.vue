<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="tree">
          <input type="text" v-model="imagesPath" placeholder="Enter the path...">
          <button id="search" @click="search()">Search</button>
        </div>
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="preview">
          <div class="item" v-for="item in images">
            {{item}}
              <!-- <img src="item.jpg" width="180px" alt="item"> -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  const fs = require('fs');

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data() {
      return {
        imagesPath: '',
        images: [],
        selectedImages: [],
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      search() {
        this.images = [];
        console.log('Start search...');
        fs.readdir(this.imagesPath, (err, dir) => {
          // this.images.push(dir);
          for (let i = 0; i < dir.length; i += 1) {
            this.images.push(dir[i]);
          }
        });
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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
      width: 80%;
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
  }

  .item {
      border: 2px solid red;
      margin: 10px;
  }

  /**/
  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

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
  }

  .preview button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .preview button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
