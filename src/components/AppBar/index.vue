<template>
  <div class="app-bar">
    <!-- SEARCH -->
    <search-block
      class="app-bar__item"
      :images="images"
      @load-images="onLoadImages"
      @clear-images="$emit('clear-images')"
    />

    <!-- SHORT INFO -->
    <short-info-block
      class="app-bar__item"
      :total="total"
    />

    <!-- DELETE -->
    <delete-block
      class="app-bar__item"
      @toggle-delete-mode="toggleDeleteMode"
    />
    <!-- FIXME: [Vue warn]: Avoid mutating a prop directly at line 18 -->
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

import SearchBlock from './components/SearchBlock.vue';
import ShortInfoBlock from './components/ShortInfoBlock.vue';
import DeleteBlock from './components/DeleteBlock.vue';

import { Images } from '../../types';

@Component({
  components: {
    SearchBlock,
    ShortInfoBlock,
    DeleteBlock,
  },
})
export default class AppBar extends Vue {
  @Emit('load-images')
  onLoadImages(images: Images): Images {
    return images;
  }

  // eslint-disable-next-line class-methods-use-this
  public get images() {
    return null;
    // return this.store.images;
  }

  // eslint-disable-next-line class-methods-use-this
  public get total() {
    return null;
    // return this.store.total;
  }

  deleteToRecycleBin = true;

  toggleDeleteMode(val: boolean): void {
    this.deleteToRecycleBin = val;
  }
}
</script>

<style>
.app-bar {
  background-color: #f1f1f1;
  display: flex;
  padding: 10px 0 10px;
}

.app-bar__item {
  flex: 20%;
}
</style>
