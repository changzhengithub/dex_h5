import Vue from 'vue'
import Router from 'vue-router'
const ShareComponent = () => import(/* webpackChunkName: 'shares' */ '@/views/share/share.vue')
const DownloadPageComponent = () => import(/* webpackChunkName: 'download-page' */ '@/views/download-page/download-page.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/share.html',
      name: 'share',
      component: ShareComponent
    },
    {
      path: '/download-page',
      name: 'download-page',
      component: DownloadPageComponent
    }
  ]
})
