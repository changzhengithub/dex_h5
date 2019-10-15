import Vue from 'vue'
import Router from 'vue-router'

const IndexComponent = () => import(/* webpackChunkName: 'indexs' */ '@/views/index/index.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '@/views/mine/mine.vue')
const AddAddressComponent = () => import(/* webpackChunkName: 'add-address' */ '@/views/add-address/add-address.vue')
const DetailComponent = () => import(/* webpackChunkName: 'detail' */ '@/views/detail/detail.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index.html',
      name: 'index',
      component: IndexComponent
    },
    {
      path: '/mine',
      name: 'mine',
      component: MineComponent
    },
    {
      path: '/add-address',
      name: 'add-address',
      component: AddAddressComponent
    },
    {
      path: '/detail/:taskNo',
      name: 'detail',
      component: DetailComponent
    }
  ]
})
