<template>
  <button class="button" :class="activeButton">
    <span class="icon" :class="iconClass"></span>
    <span>{{title}}</span>
  </button>
</template>

<script>
export default {
  name: 'SidebarButton',
  props: [
      'iconClass',
      'title',
      'isActive'
  ],
  computed: {
    activeButton() {
      return (this.isActive) ? 'active' : '';
    }
  }
}
</script>

<style>
  @import "src/assets/css/sidebar/sidebar-button.css";
</style>