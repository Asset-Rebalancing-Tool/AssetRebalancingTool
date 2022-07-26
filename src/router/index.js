import { createRouter, createWebHistory } from 'vue-router'

import OverviewView        from '@/views/OverviewView'
import AssetView           from '@/views/AssetView'
import EditView            from '@/views/EditView'
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
    name: 'EditView',
    props: true,
    component: EditView
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
