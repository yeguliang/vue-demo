import Vue from 'vue'
import Vuex from 'vuex'

import PlayService from './PlayService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PlayService,
  }
})

