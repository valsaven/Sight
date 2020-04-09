<template>
  <div class="app-bar">
    <div class="app-bar__item search">
      <button
        class="button search__btn"
        @keyup.enter="getImages(imagesPath)"
        v-text="'Up'"
      />
      <input
        v-model="imagesPath"
        type="text"
        class="search__input"
        placeholder="Enter the path..."
        @keyup.enter="getImages(imagesPath)"
      >
    </div>

    <div class="app-bar__item short-info">
      <span class="short-info__files-number">
        {{ total }} image(s) | {{ total }} image(s) selected
      </span>
    </div>

    <div class="app-bar__item remove">
      <button
        class="button remove__btn"
        :class="{ 'remove__btn_danger': !deleteToRecycleBin }"
        v-text="'Del'"
      />
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
import { Component, Vue } from 'vue-property-decorator';
import os from 'os';

const fs = require('fs');

import { format } from 'date-fns';
import { imageSize } from 'image-size';

import { useStore } from 'vuex-simple';
import { RootStore } from '@/store/store';

import { Image, Images } from '@/types';

@Component
export default class AppBar extends Vue {
  public store: RootStore = useStore(this.$store);

  public get images() {
    return this.store.images;
  }

  public get total() {
    return this.store.total;
  }

  deleteToRecycleBin: boolean = true;
  imagesPath: string = '';

  clearImages() {
    try {
      this.store.setImages([]);
      this.store.setTotal(0);
    } catch (err) {
      console.error(err);
    }
  }

  getImages() {
    const humanFileSize = (size: number): string => {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      const pow = 1024 ** i;
      return `${<any>(size / pow).toFixed(2) * 1} ${
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
      }`;
    };

    const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

    this.clearImages();

    // TODO: Remove console.log
    console.log('Start search...');

    // Empty path check
    if (!this.imagesPath) {
      alert('Error message:\nThe path is empty!');
      return;
    }

    fs.readdir(this.imagesPath, (err: any, dir: any) => {
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
          const isWindows = os.platform() === 'win32';

          const fileStats = isWindows
            ? fs.statSync(`${this.imagesPath}\\${fileName}`)
            : fs.statSync(`${this.imagesPath}/${fileName}`);


          const src = isWindows
            ? `${this.imagesPath}\\${fileName}`
            : `${this.imagesPath}/${fileName}`;

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
          };

          tempImagesArray.push(image);
        }
      }

      this.loadImages(tempImagesArray);

      // TODO: Remove console.log
      console.log(tempImagesArray.length);

      this.store.setTotal(tempImagesArray.length);

      if (this.images.length !== 0) {
        this.store.setActiveImage(this.images[0])
      }
    });
  }

  loadImages(images: Images) {
    try {
      this.store.setImages(images);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style>
.app-bar {
  background-color: #f1f1f1;
  display: flex;
  padding: 10px 0 0 0;
}

.app-bar__item {
  flex: 20%;
}
</style>
