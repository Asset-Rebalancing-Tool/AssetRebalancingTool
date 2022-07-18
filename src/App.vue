<template>
  <SidebarSection :activeTab="activeTabComponent"/>
  <component
      :is="activeTabComponent"
      :assetList="assetList"
      @nextComponent="changeTabComponent"></component>
</template>

<script>
import SidebarSection from '@/components/Sidebar/SidebarSection'
import OverviewTab    from '@/components/OverviewTab/OverviewTab'
import AssetTab       from '@/components/AssetTab/AssetTab'
import BrokerTab      from '@/components/BrokerTab/BrokerTab'
import HistoryTab     from '@/components/HistoryTab/HistoryTab'

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
