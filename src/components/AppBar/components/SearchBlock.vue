<script setup lang="ts">
import fs from 'fs';
import md5File from 'md5-file';
import { defineProps, ref } from 'vue';
import { format } from 'date-fns';
import { imageSize } from 'image-size';
import { sep } from 'path';

import { Image, Images } from '../../../types';

defineProps<{
  images: {
    type: Images,
    default: () => [],
    required: true,
  },
}>();

const emit = defineEmits(['load-images']);

const imagesPath = ref('/home/val/dev/tmppp');

function loadImages(images: Images) {
  // @Emit('load-images')

  emit('load-images', images);
  return images;
}

function clearImages() {
  // @Emit('clear-images')
}

function getImages() {
  const humanFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const pow = 1024 ** i;
    return `${<any>(size / pow).toFixed(2) * 1} ${
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    }`;
  };

  const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

  clearImages();

  // TODO: Remove console.log
  console.log('Start search...');

  // Empty path check
  if (!imagesPath.value) {
    alert('Error message:\nThe path is empty!');
    return;
  }

  fs.readdir(imagesPath.value, (err: any, dir: any) => {
    // Wrong path check
    if (err) {
      alert(`Error message:\n${err}`);
      return;
    }

    const tempImagesArray: Images = [];

    for (let i = 0; i < dir.length; i += 1) {
      const fileName = dir[i];
      const fileExt = fileName
        .split('.')
        .pop()
        .toLowerCase();

      if (imageTypes.includes(fileExt)) {
        const src = `${imagesPath.value}${sep}${fileName}`;
        const fileStats = fs.statSync(src);

        try {
          console.log(src);

          const dim = imageSize(src);
          const dimensions = `${dim.width}x${dim.height}`;

          const image: Image = {
            id: i,
            src,
            name: fileName,
            dimensions,
            ext: fileExt,
            size: humanFileSize(fileStats.size),
            modifiedTime: format(fileStats.mtimeMs, 'dd mmm yyyy, HH:mm:ss'),
            selected: false,
            active: false,
            md5: md5File.sync(src),
          };

          tempImagesArray.push(image);
        } catch (e) {
          throw new Error(e);
        }
      }
    }

    loadImages(tempImagesArray);
  });
}

function goUp() {
  const tempPath = imagesPath.value.split(sep);
  tempPath.pop();
  imagesPath.value = tempPath.join(sep);
  getImages();
}
</script>

<template>
  <div class="search-block">
    <button
      type="button"
      class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 max-w-fit bg-white"
      @click="goUp"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z" />
      </svg>
      <span class="sr-only">Go up</span>
    </button>

    <div>
      <input
        id="path"
        v-model="imagesPath"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-inner"
        required
        @keyup.enter="getImages"
      >
    </div>
  </div>
</template>
