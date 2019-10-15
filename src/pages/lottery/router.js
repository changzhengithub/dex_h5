import Vue from 'vue'
import Router from 'vue-router'

const LotteryComponent = () => import(/* webpackChunkName: 'lotterys' */ '@/views/lottery/lottery.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/lottery.html',
      name: 'lottery',
      component: LotteryComponent
    }
  ]
})
