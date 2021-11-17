import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import( /* webpackChunkName: "layout" */ '@/components/layout/index.vue'),
    children: [
    {
      path: '/',
      name: '/',
      meta:{
        path:"plugin-list"
      },
      component: () => import(/* webpackChunkName: "pluginList" */ '@/views/pluginList/index.vue'),
    }, 
    {
      path: '/plugin-list',
      name: 'pluginList',
      component: () => import(/* webpackChunkName: "pluginList" */ '@/views/pluginList/index.vue'),
    }, 
    
    
    
    {
      path: '/plugin-detail',
      name: 'pluginDetail',
      component: () => import(/* webpackChunkName: "pluginDetail" */ '@/views/pluginDetail/index.vue'),
    }
  ]
  },
  {
    path: '/',
    component: () => import( /* webpackChunkName: "layout" */ '@/components/ele/index.vue'),
    children: [{
      path: '/ele-list',
      name: 'eleList',
      component: () => import(/* webpackChunkName: "pluginList" */ '@/views/ele/List/index.vue'),
    },
     {
      path: '/ele-install',
      name: 'eleInstall',
      component: () => import(/* webpackChunkName: "pluginDetail" */ '@/views/ele/Install/index.vue'),
    },
     {
      path: '/ele-detail',
      name: 'eleDetail',
      component: () => import(/* webpackChunkName: "pluginDetail" */ '@/views/ele/Details/index.vue'),
    },
     {
      path: '/ele-setting',
      name: 'eleSetting',
      component: () => import(/* webpackChunkName: "pluginDetail" */ '@/views/ele/Setting/index.vue'),
    }]
  },
  // {
  //   path: '/*',
  //   component: () => import( /* webpackChunkName: "layout" */ '@/components/layout/index.vue'),
  //   children: [{
  //     path: '/',
  //     name: 'pluginList',
  //     component: () => import(/* webpackChunkName: "pluginList" */ '@/views/pluginList/index.vue'),
  //   }
  //   ]
  // },
]

const router = createRouter({
  history: createWebHistory('plugins/'),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   next()
// })

export default router
