<template>
  <section id="sidebar">
    <img class="logo" src="../../assets/images/app-logo.png" alt="FinQuel App Logo">
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

<style>
  @import "../../assets/css/sidebar/sidebar.css";
</style>
