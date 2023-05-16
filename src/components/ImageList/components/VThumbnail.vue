<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { Image } from '../../../types';

const props = defineProps<{
  image: Image,
}>();

defineEmits(['open-image', 'select-image']);

const isCtrlPressed = ref(false);
const isHovered = ref(false);

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Control') {
    isCtrlPressed.value = true;
  }
}

function handleKeyUp(event: KeyboardEvent) {
  if (event.key === 'Control') {
    isCtrlPressed.value = false;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
});
</script>

<template>
  <div
    class="v-thumbnail items-center border border-gray-300 flex mx-auto w-72 cursor-pointer"
    :class="{
      'bg-blue-300': props.image.selected && !(isCtrlPressed && isHovered),
      'bg-blue-400': isCtrlPressed && isHovered,
    }"
    tabindex="0"
    @click.exact="$emit('open-image', props.image)"
    @click.ctrl="$emit('select-image', props.image)"
    @keyup.enter.exact="$emit('open-image', props.image)"
    @keyup.enter.ctrl="$emit('select-image', props.image)"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image -->
    <div class="items-center border-r-2 border-dashed border-gray-400 flex h-15 justify-center w-20">
      <img
        class="max-w-20 h-14"
        :src="`sight://${props.image.src}`"
        alt="image"
      >
    </div>

    <!-- Description -->
    <div class="px-2.5 w-48">
      <div class="text-xs overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
        {{ props.image.name }}
      </div>

      <div class="items-center text-gray-600 flex text-xs h-3 justify-around mt-1">
        <div>
          {{ props.image.dimensions }}
        </div>
        <div class="uppercase">
          {{ props.image.ext }}
        </div>
      </div>
    </div>
  </div>
</template>
