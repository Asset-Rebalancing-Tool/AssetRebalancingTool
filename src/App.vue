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
  @import "css/theme.css";
  @import "css/general.css";
  @import "css/icons.css";
</style>
