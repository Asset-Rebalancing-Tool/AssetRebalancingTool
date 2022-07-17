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
      assetList: {
        'MSF': {
          'name': 'Microsoft Corp',
          'type': 'Aktie',
          'isSelected': true,
          'isin': 'US5949181045',
          'tickerSymbol': 'MSF',
          'stockPrice': 250.92,
          'formattedStockPrice': [250,92,0],
          'currency': '€',
          'shares': 6.00,
          'sharesType': 'Stk.',
          'actualValue': 2940.30,
          'actualPercentage': 12.90,
          'targetPercentage': 5.00,
          'deviation': 7.09
        },
        'SPDR': {
          'name': 'SPDR MSCI World UCITS ETF',
          'type': 'ETF',
          'isSelected': false,
          'isin': 'IE00BFY0GT14',
          'tickerSymbol': 'SPDR',
          'stockPrice': 26.292,
          'formattedStockPrice': [26,29,2],
          'currency': '€',
          'shares': 407.32,
          'sharesType': 'Stk.',
          'actualValue': 10642.59,
          'actualPercentage': 66.84,
          'targetPercentage': 70,
          'deviation': 3.16
        },
        'EM': {
          'name': 'iShares Core MSCI EM IMI',
          'type': 'ETF',
          'isSelected': false,
          'isin': 'IE00BKM4GZ66',
          'tickerSymbol': 'EM',
          'stockPrice': 28.684,
          'formattedStockPrice': [28,68,4],
          'currency': '€',
          'shares': 178.95,
          'sharesType': 'Stk.',
          'actualValue': 4561.11,
          'actualPercentage': 34.87,
          'targetPercentage': 30,
          'deviation': 4.23
        },
        'APPL': {
          'name': 'Apple Inc',
          'type': 'Aktie',
          'isSelected': false,
          'isin': 'US2546871060',
          'tickerSymbol': 'APPL',
          'stockPrice': 142.74,
          'formattedStockPrice': [142,74,0],
          'currency': '€',
          'shares': 18.00,
          'sharesType': 'Stk.',
          'actualValue': 2569.32,
          'actualPercentage': 11.31,
          'targetPercentage': 5,
          'deviation': 6.31
        },
        'BCKS': {
          'name': 'Starbucks Corp',
          'type': 'Aktie',
          'isSelected': false,
          'isin': 'US8552441094',
          'tickerSymbol': 'BCKS',
          'stockPrice': 76.69,
          'formattedStockPrice': [76,69,0],
          'currency': '€',
          'shares': 26.00,
          'sharesType': 'Stk.',
          'actualValue': 1993.94,
          'actualPercentage': 8.78,
          'targetPercentage': 5,
          'deviation': 3.78
        },
      }
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
