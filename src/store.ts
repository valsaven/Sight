import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedImages: [],
  },
  mutations: {
    toggleImageSelection(state, imageId) {
      const { selectedImages } = state;

      if (selectedImages.includes(imageId)) {
        selectedImages.splice(selectedImages.indexOf(imageId), 1);
      } else {
        selectedImages.push(imageId);
      }
    },
  },
  actions: {

  },
});
