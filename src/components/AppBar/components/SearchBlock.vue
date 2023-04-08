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
  <div class="search">
    <button
      class="button search__btn"
      type="button"
      @click="goUp"
    >
      Up
    </button>

    <input
      v-model="imagesPath"
      type="text"
      class="search__input"
      placeholder="Enter the path..."
      @keyup.enter="getImages"
    >
  </div>
</template>
