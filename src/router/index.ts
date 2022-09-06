import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
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
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
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
      path: '/edit-asset/:uuid',
      name: 'EditAsset',
      props: true,
      component: EditAsset,
    },
    {
      path: '/edit-holding-group/:groupId',
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
