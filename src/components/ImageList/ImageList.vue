<script setup lang="ts">
import { PropType, watch } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

import { Image, Images } from '../../types';
// import VImage from './components/VImage.vue';
import VThumbnail from './components/VThumbnail.vue';

const props = defineProps({
  activeImage: {
    type: Object as PropType<Image | null>,
    default: null,
  },

  images: {
    type: Array as PropType<Images>,
    default: () => [],
  },

  selectedImages: {
    type: Array as PropType<Images>,
    default: () => [],
  },
});

defineEmits(['open-image', 'select-image']);

watch(props.activeImage, (newValue: Image, oldValue: Image): void => {
  console.log(newValue);
  console.log(oldValue);
  console.log(props.activeImage);
});

// METHODS
// open(link: string): void {
//   this.$electron.shell.openExternal(link);
// }

// hotKeys(event: KeyboardEvent): void {
//   if (event.key === 'Delete') {
//     console.log('delete');
//     console.log(this.activeImage);
//     console.log(this.images);
//
//     if (this.deleteToRecycleBin) {
//       // Safe delete (to recycle bin)
//       trash([this.activeImage.src]).then(() => {
//         console.log('Images were successfully deleted.');
//         this.search(); // Update after deleting
//       });
//     } else if (!this.deleteToRecycleBin) {
//       // Permanently delete
//       fs.unlinkSync(this.activeImage.src);
//       this.search(); // Update after deleting
//     } else {
//       console.log('Error in deleting process.');
//     }
//   }
//
//   event.preventDefault(); // prevent the default action (scroll / move caret)
// }

// HOOKS
// created(): void {
//   // window.addEventListener('keyup', this.hotKeys);
// }
</script>

<template>
  <div
    v-if="images.length > 0"
    class="image-list min-w-fit max-h-full w-2/5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
  >
    <RecycleScroller
      v-slot="{ item }"
      class="scroller max-h-full"
      :items="images"
      :item-size="8"
      key-field="id"
    >
      <v-thumbnail
        :image="item"
        @open-image="$emit('open-image', item)"
        @select-image="$emit('select-image', item)"
      />
    </RecycleScroller>
  </div>
</template>
