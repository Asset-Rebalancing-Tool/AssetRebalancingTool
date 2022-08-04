import { createRouter, createWebHistory } from 'vue-router'
import PortfolioOverview from '../views/PortfolioOverview.vue'
import AssetList from '../views/AssetList.vue'
import EditAsset from '../views/EditAsset.vue'
import EditAssetGroup from '../views/EditAssetGroup.vue'
import ConnectBroker from '../views/ConnectBroker.vue'
import TransactionHistory from '../views/TransactionHistory.vue'
import ScheduleInvestments from '../views/ScheduleInvestments.vue'
import AppSettings from '../views/AppSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PortfolioOverview',
      component: PortfolioOverview,
    },
    {
      path: '/asset-list',
      name: 'AssetList',
      component: AssetList,
    },
    {
      path: '/edit-asset/:assetId',
      name: 'EditAsset',
      props: true,
      component: EditAsset,
    },
    {
      path: '/edit-asset-group/:groupId',
      name: 'EditAssetGroup',
      props: true,
      component: EditAssetGroup,
    },
    {
      path: '/connect-broker',
      name: 'ConnectBroker',
      component: ConnectBroker,
    },
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: TransactionHistory,
    },
    {
      path: '/investitionen-planen',
      name: 'ScheduleInvestments',
      component: ScheduleInvestments,
    },
    {
      path: '/app-einstellungen',
      name: 'AppSettings',
      component: AppSettings,
    },
  ],
})

export default router
