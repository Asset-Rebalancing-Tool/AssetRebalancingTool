<template>
  <SidebarSection />
  <router-view />
</template>

<script>
import SidebarSection from '@/components/sidebar/SidebarSection'

export default {
  name: 'App',
  components: {
    SidebarSection,
  }
}
</script>

<style>
  @import "assets/css/theme.css";
  @import "assets/css/general.css";
  @import "assets/css/icons.css";
</style>
