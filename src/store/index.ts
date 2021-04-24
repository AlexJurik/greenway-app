import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './interfaces'
import notification from './notification/index';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    charging: false
  },
  mutations,
  actions,
  getters,
  modules: { notification },
}

export default new Vuex.Store<RootState>(store)
