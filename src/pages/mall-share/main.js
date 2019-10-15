import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局消息提示框
import Toast from '../../components/common/toast/toast.js'
Vue.prototype.$toast = Toast

// 引入样式
import '../../../public/static/iconfont/iconfont.css'
import '../../assets/css/reset.css'

// 我的助力上拉加载更多
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

// 商品详情分享页分页
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')