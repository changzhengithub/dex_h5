import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)

// 引入样式
import '../../../public/static/iconfont/iconfont.css'
import '../../assets/css/reset.css'
// 我的助力上拉加载更多

// 引入全局消息提示框
import Toast from '../../components/common/toast/toast.js'
Vue.prototype.$toast = Toast

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

// 助力免费拿分页
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')