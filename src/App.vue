<template>
  <div id="app">
    <div id="wrapper">
      <main>
        <app-bar/>
        <preview-block v-if="images.length > 0" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import AppBar from './components/AppBar.vue';
import PreviewBlock from './components/PreviewBlock.vue';

@Component({
  components: {
    AppBar,
    PreviewBlock,
  },
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  computed: mapState([
    'images',
    'total',
  ]),
})
export default class App extends Vue {
  public images!: []; // is assigned via mapState
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
  flex-direction: column;
}
</style>
