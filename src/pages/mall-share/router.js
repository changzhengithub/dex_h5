import Vue from 'vue'
import Router from 'vue-router'
const MallShareComponent = () => import(/* webpackChunkName: 'mall-shares' */ '@/views/mall-share/mall-share.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mall-share.html',
      name: 'mall-share',
      component: MallShareComponent
    }
  ]
})
