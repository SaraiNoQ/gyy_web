import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [],
    userName: '',
    loginState: false
  },
  mutations: {
    initRoutes (state, data) {
      state.routes = data
    },
    setUserName (state, data) {
      state.userName = data
    },
    setLoginState (state, data) {
      state.loginState = data
    }
  },
  actions: {
  },
  modules: {
  }
})
