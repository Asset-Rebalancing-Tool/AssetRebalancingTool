<template>
  <section id="sidebar">

    <header>
      <div class="app-logo" />
    </header>

    <SidebarButton
        v-for="sidebarButton in sidebarButtons"
        :key="sidebarButton.key"
        :title="sidebarButton.title"
        :iconClass="sidebarButton.iconClass"
        :isActive="capitalizeFirstLetter(sidebarButton.key) === activeTab"
        @click.prevent="changeParentComponent($event, sidebarButton.key)"
    />

  </section>
</template>

<script>
import SidebarButton from '@/components/sidebar/SidebarButton';

export default {
  name: 'SidebarSection',
  components: {
    SidebarButton
  },
  props: [
    'activeTab'
  ],
  data() {
    return {
      'sidebarButtons': [
          { key: 'overviewTab', title: 'Übersicht',            iconClass: 'overview' },
          { key: 'assetTab',    title: 'Assets verwalten',     iconClass: 'asset'    },
          { key: 'brokerTab',   title: 'Broker Anbindung',     iconClass: 'broker'   },
          { key: 'historyTab',  title: 'Transaktionshistorie', iconClass: 'history'  },
      ]
    };
  },
  methods: {
    changeParentComponent (event, targetTab) {
      this.$parent.changeTabComponent(this.capitalizeFirstLetter(targetTab))
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
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
