<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>

    <RouterLink
      v-for="link in sidebarLinks"
      :key="link.component"
      :to="{ name: link.component }"
    >
      <span class="icon" :class="link.component"></span>
      <span>{{ link.label }}</span>
    </RouterLink>
  </section>
</template>

<script lang="ts" setup>
const sidebarLinks = [
  { component: 'PortfolioOverview', label: 'Übersicht' },
  { component: 'ConnectBroker', label: 'Broker Anbindung' },
  { component: 'AssetList', label: 'Assets verwalten' },
  { component: 'TransactionHistory', label: 'Transaktionshistorie' },
  { component: 'ScheduleInvestments', label: 'Investitionen planen' },
  { component: 'AppSettings', label: 'Einstellungen' },
]
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar/_sidebar.scss';
</style>
