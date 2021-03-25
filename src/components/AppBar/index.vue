<template>
  <div class="app-bar">
    <!-- SEARCH -->
    <search-block
      class="app-bar__item"
      :images="images"
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
import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';

import { RootStore } from '@/store/store';
import SearchBlock from './components/SearchBlock.vue';
import ShortInfoBlock from './components/ShortInfoBlock.vue';
import DeleteBlock from './components/DeleteBlock.vue';

@Component({
  components: {
    SearchBlock,
    ShortInfoBlock,
    DeleteBlock,
  },
})
export default class AppBar extends Vue {
  public store: RootStore = useStore(this.$store);

  public get images() {
    return this.store.images;
  }

  public get total() {
    return this.store.total;
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
