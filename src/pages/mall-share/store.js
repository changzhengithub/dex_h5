import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    commodityData: null
  },
  mutations: {
    saveCommodityData (state, commodityData) {
      state.commodityData = commodityData
    }
  },
  actions: {

  }
})
