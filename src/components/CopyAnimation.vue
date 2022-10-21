<template>
  <div class="copy-animation-wrapper" :class="{ show: showAnim }"></div>
  <button @click="playAnim">test</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showAnim = ref(false)

function playAnim() {
  showAnim.value = true
  setTimeout(() => {
    showAnim.value = false
  }, 150)
}
</script>

<style lang="scss" scoped>
.copy-animation-wrapper {
  @include absolute-left-top-0;
  @include flex-center-xy;
  width: 100%;
  height: 100vh;
  background-color: $main-color;
  z-index: 500;
  pointer-events: none;
  opacity: 0;
  transition: 150ms ease-out;
}

.copy-animation-wrapper.show {
  opacity: 1;
}
</style>
