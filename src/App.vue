<template>
  <SidebarSection />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
</script>

<style lang="scss">
body {
  @include full-reset;
  display: flex;
  height: 100vh;
  background: $primary-background-color;
  font-family: $primary-font-family;
  font-size: $primary-font-size;
  line-height: $primary-line-height;
  //text-rendering: optimizeLegibility;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
  display: flex;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
  @include full-reset;
}

p {
  font-family: $primary-font-family;
  font-size: $primary-font-size;
  line-height: $primary-line-height;
  color: $primary-text-color;
}
</style>
