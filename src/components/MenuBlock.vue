<template>
  <div class="menu">
    <div class="search">
      <h3
        class="search__title"
        v-text="'Search'"
      />
      <input
        v-model="imagesPath"
        type="text"
        class="search__input"
        placeholder="Enter the path..."
        @keyup.enter="getImages(imagesPath)"
      >
      <button
        class="button search__btn"
        @click="getImages(imagesPath)"
      >
        <i class="material-icons">image_search</i>
      </button>
    </div>
    <div class="short-info">
      <h3
        class="short-info__title"
        v-text="'Short info'"
      />
      <span class="short-info__files-number">
        {{ total }} image(s) | {{ total }} image(s) selected
      </span>
    </div>
    <div class="remove">
      <h3
        class="remove"
        v-text="'Remove'"
      />
      <button
        class="button remove__btn"
        :class="{ 'remove__btn_danger': !deleteToRecycleBin }"
      >
        <i class="material-icons">
          {{ deleteToRecycleBin ? 'delete' : 'delete_forever' }}
        </i>
      </button>
      <br>
      Remove files to recycle bin
      <input
        v-model="deleteToRecycleBin"
        type="checkbox"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MenuBlock',
  data() {
    return {
      deleteToRecycleBin: true,
      imagesPath: '',
    };
  },
  computed: {
    ...mapState(['images', 'selectedImages', 'total']),
  },
  methods: {
    ...mapMutations(['setItem']),
    ...mapActions([
      'loadImages',
      'clearImages',
      'getImages',
    ]),
  },
};
</script>

<style scoped>
.menu {
  background-color: #f1f1f1;
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
  padding: 10px 0 0 0;
}

.button {
  background-color: #1e90ff;
  border-radius: 6px;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 30px;
  padding: 3px;
}

.button:focus {
  outline: none;
}

.button:hover {
  background-color: #4169e1;
}

.remove__btn_danger {
  background-color: #ff5252;
}

.remove__btn_danger:hover {
  background-color: #d31919;
}
</style>
