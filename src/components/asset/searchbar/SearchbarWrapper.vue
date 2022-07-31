<template>
  <div class="searchbar-wrapper"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'SearchbarWrapper'
})
</script>

<style scoped>
  .searchbar-wrapper {
    display: none;
    position: absolute;
    bottom: -40px; /* Input height 52px + Row gap 10px + Modal height Xpx */
    left: 0;
    width: 100%;
    height: 50px;
    padding: 0 25px;
    background-color: var(--secondary-background-color);
    border-radius: var(--primary-border-radius);
  }
</style>
