<template>
  <section id="sidebar">

    <header>
      <div class="app-logo" />
    </header>

    <nav>
      <router-link class="overview" :to="{name: 'OverviewView'}">
        <span class="icon overview"></span>
        <span>Übersicht</span>
      </router-link>
      <router-link class="asset" :to="{name: 'AssetView'}">
        <span class="icon asset"></span>
        <span>Assets verwalten</span>
      </router-link>
      <router-link class="broker" :to="{name: 'BrokerView'}">
        <span class="icon broker"></span>
        <span>Broker Anbindung</span>
      </router-link>
      <router-link class="history" :to="{name: 'TransactionHistory' }">
        <span class="icon history"></span>
        <span>Transaktionshistorie</span>
      </router-link>
    </nav>

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

  .icon.overview { background-image: var(--icon-overview-tab); }
  .icon.asset    { background-image: var(--icon-asset-tab);    }
  .icon.broker   { background-image: var(--icon-broker-tab);   }
  .icon.history  { background-image: var(--icon-history-tab);  }

  span {
    color: var(--secondary-text-color);
    margin-left: 20px;
    cursor: pointer;
  }

  a.router-link-exact-active span {
    color: var(--primary-text-color);
  }

</style>
