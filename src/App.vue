<template>
  <SidebarSection />
  <router-view />
  <ModalUnderlay />
</template>

<script>
import SidebarSection from '@/components/sidebar/SidebarSection'
import ModalUnderlay  from '@/components/asset/searchbar/ModalUnderlay'

export default {
  name: 'App',
  components: {
    SidebarSection,
    ModalUnderlay
  }
}
</script>

<style>
  @import "assets/css/theme.css";
  @import "assets/css/general.css";
  @import "assets/css/icons.css";
</style>
