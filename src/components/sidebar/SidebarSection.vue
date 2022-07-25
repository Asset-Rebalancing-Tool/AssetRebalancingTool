<template>
  <section id="sidebar">

    <header>
      <div class="app-logo" />
    </header>

    <router-link class="overview" :to="{ name: 'OverviewTab' }">Übersicht</router-link> |
    <router-link class="asset"    :to="{ name: 'AssetTab'    }">Assets verwalten</router-link>
    <router-link class="broker"   :to="{ name: 'BrokerTab'   }">Broker Anbindung</router-link>
    <router-link class="history"  :to="{ name: 'HistoryTab'  }">Transaktionshistorie</router-link>

  </section>
</template>

<script>
export default {
  name: 'SidebarSection',
}
</script>

<style scoped>
  #sidebar {
    min-width: 210px;
    height: 100vh;
    background-color: var(--secondary-background-color);
    border-right: 1px solid var(--passive-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }

  .app-logo {
    width: 100px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: var(--app-logo);
  }
</style>
