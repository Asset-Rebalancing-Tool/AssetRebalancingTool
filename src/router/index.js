import { createRouter, createWebHistory } from 'vue-router'

import OverviewTab from '@/components/tab/overview/OverviewTab'
import AssetTab    from '@/components/tab/asset/AssetTab'
import BrokerTab   from '@/components/tab/broker/BrokerTab'
import HistoryTab  from '@/components/tab/history/HistoryTab'

const routes = [
  {
    path: '/',
    name: 'OverviewTab',
    component: OverviewTab
  },
  {
    path: '/assets',
    name: 'AssetTab',
    component: AssetTab
  },
  {
    path: '/broker',
    name: 'BrokerTab',
    component: BrokerTab
  },
  {
    path: '/history',
    name: 'HistoryTab',
    component: HistoryTab
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
