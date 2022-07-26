import { createRouter, createWebHistory } from 'vue-router'

import OverviewView        from '@/views/OverviewView'
import AssetView           from '@/views/AssetView'
import EditAsset           from '@/views/EditAsset'
import BrokerView          from '@/views/BrokerView'
import TransactionHistory  from '@/views/TransactionHistory'

const routes = [
  {
    path: '/',
    name: 'OverviewView',
    component: OverviewView
  },
  {
    path: '/assets',
    name: 'AssetView',
    component: AssetView
  },
  {
    path: '/asset/edit/:id',
    name: 'EditAsset',
    props: true,
    component: EditAsset
  },
  {
    path: '/broker',
    name: 'BrokerView',
    component: BrokerView
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
