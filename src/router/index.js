import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Harrison from '@/pages/harrison'
import HarrisonIndex from '@/pages/harrison/index/index'
import HarrisonArticle from '@/pages/harrison/article'
import HarrisonMsg from '@/pages/harrison/msg'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/harrison',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/harrison',
          redirect: '/harrison/index',
          name: 'harrison',
          component: Harrison,
          children: [
            {
              path: 'index',
              name: 'harrison-index',
              component: HarrisonIndex
            },
            {
              path: 'article',
              name: 'harrison-article',
              component: HarrisonArticle
            },
            {
              path: 'msg',
              name: 'harrison-msg',
              component: HarrisonMsg
            }
          ]
        }
      ]
    }
  ]
})
