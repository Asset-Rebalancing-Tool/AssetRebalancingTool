<template>
  <div class="move-action-wrapper" v-show="showWrapper">
  </div>
</template>

<script>
export default {
  name: 'GroupContextMenu',
  props: {
    showWrapper: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
  .move-action-wrapper {
    position: absolute;
    right: 0;
    bottom: -410px;
    width: 250px;
    height: 400px;
    background-color: var(--primary-background-color);
    border: 1px solid var(--passive-border-color);
    border-radius: var(--primary-border-radius);
    box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
    z-index: 10;
  }

  .move-action-wrapper.active {
    display: block;
  }
</style>