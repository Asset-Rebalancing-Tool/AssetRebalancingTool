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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/asset-list',
      name: 'AssetList',
      component: AssetList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-asset/:uuid',
      name: 'EditAsset',
      props: true,
      component: EditAsset,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-holding-group/:groupId',
      name: 'EditAssetGroup',
      props: true,
      component: EditAssetGroup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/connect-broker',
      name: 'ConnectBroker',
      component: ConnectBroker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: TransactionHistory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/investitionen-planen',
      name: 'ScheduleInvestments',
      component: ScheduleInvestments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app-einstellungen',
      name: 'AppSettings',
      component: AppSettings,
      meta: {
        requiresAuth: true
      }
    },
  ],
})

router.beforeEach(async (toRout) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
      '/sign-in',
      '/sign-up'
  ];

  // Bool that indicates if target rout require a token
  const tokenRequired = !publicPages.includes(toRout.path);

  // Redirect if route require token, but there is no token in local storage
  if (tokenRequired && localStorage.getItem('token') === null) {
    return '/sign-in';
  }

  // Redirect if route that does not require token, but token is set
  if (!tokenRequired && localStorage.getItem('token') !== null) {
    return '/asset-list';
  }
});

export default router
