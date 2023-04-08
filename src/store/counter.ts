import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count += 1;
    },
  },
});
