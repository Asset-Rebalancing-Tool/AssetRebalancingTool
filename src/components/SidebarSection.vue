<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>

    <RouterLink :to="{ name: 'PortfolioOverview' }">
      <IconSidebarOverview />
      <span>{{ $t('sidebar.overview') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'ConnectBroker' }">
      <IconSidebarBroker />
      <span>{{ $t('sidebar.broker') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'AssetList' }">
      <IconSidebarAssets />
      <span>{{ $t('sidebar.assets') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'ScheduleInvestments' }">
      <IconSidebarSchedule />
      <span>{{ $t('sidebar.schedule') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'TransactionHistory' }">
      <IconSidebarHistory />
      <span>{{ $t('sidebar.transactions') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'AppSettings' }">
      <IconSidebarSettings />
      <span>{{ $t('sidebar.settings') }}</span>
    </RouterLink>

    <footer>
      <RouterLink :to="{ name: 'SignIn' }" @click="logoutUser">
        <IconSidebarLogout />
        <span>{{ $t('sidebar.signOut') }}</span>
      </RouterLink>
    </footer>
  </section>
</template>

<script setup>
import IconSidebarOverview from '@/assets/icons/sidebar/IconSidebarOverview.vue'
import IconSidebarBroker from '@/assets/icons/sidebar/IconSidebarBroker.vue'
import IconSidebarAssets from '@/assets/icons/sidebar/IconSidebarAssets.vue'
import IconSidebarSchedule from '@/assets/icons/sidebar/IconSidebarSchedule.vue'
import IconSidebarHistory from '@/assets/icons/sidebar/IconSidebarTransactions.vue'
import IconSidebarSettings from '@/assets/icons/sidebar/IconSidebarSettings.vue'
import IconSidebarLogout from '@/assets/icons/sidebar/IconSidebarLogout.vue'
import { logoutUser } from '@/services/TokenService'
</script>

<style lang="scss">
@import '@/assets/scss/views/sidebar-section.scss';
</style>
