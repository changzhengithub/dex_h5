import Vue from 'vue'
import Router from 'vue-router'
const InviteComponent = () => import(/* webpackChunkName: 'invites' */ '@/views/invite/invite.vue')
const InvitePosterComponent = () => import(/* webpackChunkName: 'invite-poster' */ '@/views/invite-poster/invite-poster.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/invite.html',
      name: 'invite',
      component: InviteComponent
    },
    {
      path: '/invite-poster',
      name: 'invite-poster',
      component: InvitePosterComponent
    }
  ]
})
