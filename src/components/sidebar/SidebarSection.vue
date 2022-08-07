<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>
    <RouterLink :to="{ name: 'PortfolioOverview' }">
      <span class="icon overview"></span>
      <span>Übersicht</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ConnectBroker' }">
      <span class="icon broker"></span>
      <span>Broker Anbindung</span>
    </RouterLink>
    <RouterLink :to="{ name: 'AssetList' }">
      <span class="icon asset"></span>
      <span>Assets verwalten</span>
    </RouterLink>
    <RouterLink :to="{ name: 'TransactionHistory' }">
      <span class="icon history"></span>
      <span>Transaktionshistorie</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ScheduleInvestments' }">
      <span class="icon invest"></span>
      <span>Investitionen planen</span>
    </RouterLink>
    <RouterLink :to="{ name: 'AppSettings' }">
      <span class="icon settings"></span>
      <span>Einstellungen</span>
    </RouterLink>

    <div v-if="false" class="logout-wrapper">
      <span class="icon logout"></span>
      <span>Abmelden</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarSection',
})
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar/_sidebar.scss';
</style>
