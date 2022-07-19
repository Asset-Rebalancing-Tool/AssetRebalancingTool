<template>
  <div class="button" :class="activeButton">
    <div class="icon" :class="iconClass"></div>
    <label>{{title}}</label>
  </div>
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