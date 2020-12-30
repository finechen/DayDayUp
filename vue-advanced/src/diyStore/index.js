import Vue from 'vue'
import Vuex from './diyVuex'
console.log('Vuex: ', Vuex);

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  increment(state, n = 1) {
    state.count += n
  }
}

const actions = {
  incrementAsync({ commit, dispatch }) {
    setTimeout(() => {
      commit('increment', 2)
    }, 500)
  }
}

const getters = {
  count() {
    return state.count
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})