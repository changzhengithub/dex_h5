import Vue from 'vue'
import Router from 'vue-router'
const SignCopyComponent = () => import(/* webpackChunkName: 'sign-copys' */ '@/views/sign-copy/sign-copy.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sign-copy.html',
      name: 'sign-copy',
      component: SignCopyComponent
    }
  ]
})
