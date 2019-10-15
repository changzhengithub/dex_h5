import Vue from 'vue'
import Router from 'vue-router'

const ReportComponent = () => import(/* webpackChunkName: 'reports' */ '@/views/report/report.vue')
const ReportMultiComponent = () => import(/* webpackChunkName: 'report-multi' */ '@/views/report-multi/report-multi.vue')
const ReportBlackListComponent = () => import(/* webpackChunkName: 'report-blacklist' */ '@/views/report-blacklist/report-blacklist.vue')
const ReportCallComponent = () => import(/* webpackChunkName: 'report-call' */ '@/views/report-call/report-call.vue')
const ReportRelationComponent = () => import(/* webpackChunkName: 'report-relation' */ '@/views/report-relation/report-relation.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/report.html',
      name: 'report',
      component: ReportComponent
    },
    {
      path: '/mine',
      name: 'mine',
      component: ReportMultiComponent
    },
    {
      path: '/report-blacklist',
      name: 'report-blacklist',
      component: ReportBlackListComponent
    },
    {
      path: '/report-call',
      name: 'report-call',
      component: ReportCallComponent
    },
    {
      path: '/report-relation',
      name: 'report-relation',
      component: ReportRelationComponent
    }
  ]
})
