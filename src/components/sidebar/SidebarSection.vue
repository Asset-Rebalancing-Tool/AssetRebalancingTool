<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>
    <RouterLink class="overview" :to="{ name: 'PortfolioOverview' }">
      <span class="icon overview"></span>
      <span>Übersicht</span>
    </RouterLink>
    <RouterLink class="asset" :to="{ name: 'AssetList' }">
      <span class="icon asset"></span>
      <span>Assets verwalten</span>
    </RouterLink>
    <RouterLink class="broker" :to="{ name: 'ConnectBroker' }">
      <span class="icon broker"></span>
      <span>Broker Anbindung</span>
    </RouterLink>
    <RouterLink class="history" :to="{ name: 'TransactionHistory' }">
      <span class="icon history"></span>
      <span>Transaktionshistorie</span>
    </RouterLink>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarSection',
})
</script>

<style lang="scss">
@import '@/assets/scss/components/_sidebar.scss';
</style>
