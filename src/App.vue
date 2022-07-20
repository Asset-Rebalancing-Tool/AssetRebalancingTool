<template>
  <SidebarSection :activeTab="activeTabComponent"/>
  <component
      :is="activeTabComponent"
      @nextComponent="changeTabComponent"
  ></component>
</template>

<script>
import SidebarSection from '@/components/sidebar/SidebarSection'
import OverviewTab    from '@/components/tab/overview/OverviewTab'
import AssetTab       from '@/components/tab/asset/AssetTab'
import BrokerTab      from '@/components/tab/broker/BrokerTab'
import HistoryTab     from '@/components/tab/history/HistoryTab'

export default {
  name: 'App',
  components: {
    SidebarSection,
    OverviewTab,
    AssetTab,
    BrokerTab,
    HistoryTab
  },
  data() {
    return {
      activeTabComponent: 'AssetTab',
    }
  },
  methods: {
    changeTabComponent (tabComponent) {
      this.activeTabComponent = tabComponent;
    },
  }
}
</script>

<style>
  @import "src/assets/css/theme.css";
  @import "src/assets/css/general.css";
  @import "src/assets/css/icons.css";
</style>
