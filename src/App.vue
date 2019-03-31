<template>
  <v-app id="app">
    <div id="wrapper">
      <main>
        <menu-block />
        <preview-block v-if="images.length > 0" />
      </main>
    </div>
  </v-app>
</template>

<script lang="ts">
import { mapState } from 'vuex';

import MenuBlock from './components/MenuBlock.vue';
import PreviewBlock from './components/PreviewBlock.vue';

export default {
  name: 'Watcher',
  components: {
    menuBlock: MenuBlock,
    previewBlock: PreviewBlock,
  },
  computed: {
    ...mapState(['images']),
  },
};
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
#app,
.main {
  height: 90%;
}

.main {
  display: flex;
}

.image-block_selected {
  border: 2px solid #009;
}

.image-block_active {
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
</style>
