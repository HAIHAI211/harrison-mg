import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import HariMg from '@/pages/hari-mg'
import HariMgIndex from '@/pages/hari-mg/index/index'
import HariMgArticle from '@/pages/hari-mg/article'
import HariMgMsg from '@/pages/hari-mg/msg'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/hari-mg/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/hari-mg',
          name: 'hari-mg',
          component: HariMg,
          children: [
            {
              path: 'index',
              name: 'hari-mg-index',
              component: HariMgIndex
            },
            {
              path: 'article',
              name: 'hari-mg-article',
              component: HariMgArticle
            },
            {
              path: 'msg',
              name: 'hari-mg-msg',
              component: HariMgMsg
            }
          ]
        }
      ]
    }
  ]
})
