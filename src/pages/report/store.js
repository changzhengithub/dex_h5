import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productId: null // 创建分享任务的商品ID
  },
  mutations: {
    saveProductId (state, productId) {
      state.productId = productId
    }
  },
  actions: {

  }
})
