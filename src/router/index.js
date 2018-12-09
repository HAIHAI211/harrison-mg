import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import RunMathMp from '@/pages/run-math-mp'
import RunMathMpRule from '@/pages/run-math-mp/rule'
import RunMathMpGift from '@/pages/run-math-mp/gift'
import RunMathMpOrder from '@/pages/run-math-mp/order'
import RunMathMpAdv from '@/pages/run-math-mp/adv'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/run-math-mp/rule',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/run-math-mp',
          name: 'run-math-mp',
          component: RunMathMp,
          children: [
            {
              path: 'rule',
              name: 'run-math-mp-rule',
              component: RunMathMpRule
            },
            {
              path: 'gift',
              name: 'run-math-mp-gift',
              component: RunMathMpGift
            },
            {
              path: 'order',
              name: 'run-math-mp-order',
              component: RunMathMpOrder
            },
            {
              path: 'adv',
              name: 'run-math-mp-adv',
              component: RunMathMpAdv
            }
          ]
        }
      ]
    }
  ]
})
