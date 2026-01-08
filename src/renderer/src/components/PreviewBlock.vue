<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Image } from '../types';

const props = defineProps<{ activeImage?: Image }>();

const fullImageSrc = ref<string>(''); // Successfully loaded image source
const hasError = ref<boolean>(false); // Load error flag

watch(() => props.activeImage, async (img) => {
  hasError.value = false; // Reset error on image change

  if (!img) {
    fullImageSrc.value = '';
    return;
  }

  try {
    // Request base64 only when image is selected
    const result = await window.electron.getFullImageBase64(img.src);

    if (typeof result === 'string') {
      fullImageSrc.value = result;
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (err) {
    console.error('Error loading full image:', err);
    fullImageSrc.value = '';
    hasError.value = true;
  }
}, { immediate: true });
</script>

<template>
  <div class="preview-block">
    <!-- Successfully loaded image -->
    <img v-if="props.activeImage && fullImageSrc && !hasError" class="preview-block__image" :src="fullImageSrc"
      alt="Preview" />

    <!-- Placeholder: no image selected -->
    <svg v-else-if="!props.activeImage" class="preview-block__blank" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 12.25c1.24 0 2.25-1.01 2.25-2.25S13.24 7.75 12 7.75 9.75 8.76 9.75 10s1.01 2.25 2.25 2.25zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9v-.75zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
    </svg>

    <!-- Placeholder: load error -->
    <svg v-else-if="hasError" class="preview-block__blank preview-block__error" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64" fill="currentColor">
      <path
        d="M32.085 56.058c6.165-.059 12.268-2.619 16.657-6.966 5.213-5.164 7.897-12.803 6.961-20.096-1.605-12.499-11.855-20.98-23.772-20.98-9.053 0-17.853 5.677-21.713 13.909-2.955 6.302-2.96 13.911 0 20.225 3.832 8.174 12.488 13.821 21.559 13.908h.308Zm-.282-4.003c-9.208-.089-17.799-7.227-19.508-16.378-1.204-6.452 1.07-13.433 5.805-18.015 5.53-5.35 14.22-7.143 21.445-4.11 6.466 2.714 11.304 9.014 12.196 15.955.764 5.949-1.366 12.184-5.551 16.48-3.672 3.767-8.82 6.016-14.131 6.068h-.256Zm-12.382-10.29 9.734-9.734-9.744-9.744 2.804-2.803 9.744 9.744L42.037 19.15l2.808 2.807-10.078 10.079 10.098 10.098-2.803 2.804-10.099-10.099-9.734 9.734-2.808-2.808Z" />
    </svg>
  </div>
</template>

<style scoped>
.preview-block {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 6px;
  width: 100%;
}

.preview-block__image {
  /* For transparent images */
  background: var(--surface-light);
  border-radius: 8px;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.preview-block__blank {
  color: var(--icon);
  height: 350px;
  width: 350px;
}

.preview-block__error {
  color: var(--error);
}
</style>
