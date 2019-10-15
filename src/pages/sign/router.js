import Vue from 'vue'
import Router from 'vue-router'
const SignComponent = () => import(/* webpackChunkName: 'signs' */ '@/views/sign/sign.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sign.html',
      name: 'sign',
      component: SignComponent
    }
  ]
})
