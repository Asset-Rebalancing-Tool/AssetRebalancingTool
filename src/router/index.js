import { createRouter, createWebHistory } from 'vue-router'

import PortfolioOverview        from '@/views/PortfolioOverview'
import AssetView           from '@/views/AssetView'
import EditAsset           from '@/views/EditAsset'
import EditAssetGroup      from '@/views/EditAssetGroup'
import ConnectBroker          from '@/views/ConnectBroker'
import TransactionHistory  from '@/views/TransactionHistory'

const routes = [
  {
    path: '/',
    name: 'PortfolioOverview',
    component: PortfolioOverview
  },
  {
    path: '/assets',
    name: 'AssetView',
    component: AssetView
  },
  {
    path: '/edit-asset/:assetId',
    name: 'EditAsset',
    props: true,
    component: EditAsset
  },
  {
    path: '/edit-asset-group/:groupId',
    name: 'EditAssetGroup',
    props: true,
    component: EditAssetGroup
  },
  {
    path: '/connect-broker',
    name: 'ConnectBroker',
    component: ConnectBroker
  },
  {
    path: '/transaction-history',
    name: 'TransactionHistory',
    component: TransactionHistory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
