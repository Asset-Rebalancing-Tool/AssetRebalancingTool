<template>
  <div class="button" :class="(isActive) ? 'active' : ''">
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
  ]
}
</script>