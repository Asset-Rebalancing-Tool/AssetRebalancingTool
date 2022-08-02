<template>
  <section id="sidebar">
    <header>
      <div class="app-logo" />
    </header>
    <nav>
      <RouterLink class="overview" :to="{name: 'PortfolioOverview'}">
        <span class="icon overview"></span>
        <span>Übersicht</span>
      </RouterLink>
      <RouterLink class="asset" :to="{name: 'AssetList'}">
        <span class="icon asset"></span>
        <span>Assets verwalten</span>
      </RouterLink>
      <RouterLink class="broker" :to="{name: 'ConnectBroker'}">
        <span class="icon broker"></span>
        <span>Broker Anbindung</span>
      </RouterLink>
      <RouterLink class="history" :to="{name: 'TransactionHistory' }">
        <span class="icon history"></span>
        <span>Transaktionshistorie</span>
      </RouterLink>
    </nav>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarSection',
})
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

  nav {
    width: 100%;
  }

  a {
    position: relative;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: none;
    text-decoration: none;
    border-right: 5px solid var(--secondary-background-color);
    background-color: transparent;
  }

  a.router-link-exact-active {
    border-color: var(--main-color);
  }

  a.router-link-exact-active:before {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80%;
    content: "";
    background-image: linear-gradient(90deg, rgba(25, 179, 153, 0), rgba(25, 179, 153, 0.24));
  }

  .icon {
    width: 22px;
    height: 22px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: 10;
  }

  a.router-link-exact-active .icon {
    opacity: 1;
  }

  .icon.overview { background-image: var(--icon-portfolio-overview);  }
  .icon.asset    { background-image: var(--icon-asset-list);          }
  .icon.broker   { background-image: var(--icon-connect-broker);      }
  .icon.history  { background-image: var(--icon-transaction-history); }

  span {
    color: var(--secondary-text-color);
    margin-left: 20px;
    cursor: pointer;
  }

  a.router-link-exact-active span {
    color: var(--primary-text-color);
  }

</style>
