<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>

    <RouterLink
      v-for="link in sidebarLinks"
      :key="link.component"
      :to="{ name: link.component }"
      :class="activeSubView"
    >
      <span class="icon" :class="link.component"></span>
      <span>{{ link.label }}</span>
    </RouterLink>
  </section>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarLinks = [
  { component: 'PortfolioOverview', label: 'Übersicht' },
  { component: 'ConnectBroker', label: 'Broker Anbindung' },
  { component: 'AssetList', label: 'Assets verwalten' },
  { component: 'TransactionHistory', label: 'Transaktionshistorie' },
  { component: 'ScheduleInvestments', label: 'Investitionen planen' },
  { component: 'AppSettings', label: 'Einstellungen' },
]

// Watch route changes in order to render active class for sub views
const activeSubView = ref('')
watch(
  () => route.name,
  () => {
    activeSubView.value = route.name === 'EditAsset' ? 'active-sub-view' : ''
  }
)
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar/_sidebar.scss';
</style>
