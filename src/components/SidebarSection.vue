<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>

    <RouterLink :to="{ name: 'PortfolioOverview' }">
      <IconSidebarOverview />
      <span>Übersicht</span>
    </RouterLink>

    <RouterLink :to="{ name: 'ConnectBroker' }">
      <IconSidebarBroker />
      <span>Broker Anbindung</span>
    </RouterLink>

    <RouterLink :to="{ name: 'AssetList' }">
      <IconSidebarAssets />
      <span>Assets Verwalten</span>
    </RouterLink>

    <RouterLink :to="{ name: 'ScheduleInvestments' }">
      <IconSidebarSchedule />
      <span>Investitionen planen</span>
    </RouterLink>

    <RouterLink :to="{ name: 'TransactionHistory' }">
      <IconSidebarHistory />
      <span>Transaktionshistorie</span>
    </RouterLink>

    <RouterLink :to="{ name: 'AppSettings' }">
      <IconSidebarSettings />
      <span>Einstellungen</span>
    </RouterLink>

    <RouterLink :to="{ name: 'AppSettings' }" @click="logout">
      <IconSidebarLogout />
      <span>Abmelden</span>
    </RouterLink>
  </section>
</template>

<script setup>
import IconSidebarOverview from '@/assets/icons/sidebar/IconSidebarOverview.vue'
import IconSidebarBroker from '@/assets/icons/sidebar/IconSidebarBroker.vue'
import IconSidebarAssets from '@/assets/icons/sidebar/IconSidebarAssets.vue'
import IconSidebarSchedule from '@/assets/icons/sidebar/IconSidebarSchedule.vue'
import IconSidebarHistory from '@/assets/icons/sidebar/IconSidebarTransactions.vue'
import IconSidebarSettings from '@/assets/icons/sidebar/IconSidebarSettings.vue'
import IconSidebarLogout from "@/assets/icons/sidebar/IconSidebarLogout.vue";
import { logout } from "@/services/TokenService";
</script>

<style lang="scss">
@import '@/assets/scss/views/sidebar-section.scss';
</style>
