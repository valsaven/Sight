<template>
  <div class="v-loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.loader {
  animation: rotate3d 3s infinite linear;
  height: 80px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform-style: preserve-3d;
  width: 80px;
}

.loader div {
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  height: 40px;
  opacity: 0.8;
  position: absolute;
  width: 40px;
}

.loader div:nth-child(1) {
  transform: rotateY(0deg) translateZ(40px);
}

.loader div:nth-child(2) {
  transform: rotateY(90deg) translateZ(40px);
}

.loader div:nth-child(3) {
  transform: rotateY(180deg) translateZ(40px);
}

.loader div:nth-child(4) {
  transform: rotateY(270deg) translateZ(40px);
}

@keyframes rotate3d {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
