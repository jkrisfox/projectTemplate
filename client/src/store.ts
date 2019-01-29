import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { iUser } from "@/models/user.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
}

const state: iRootState = {
  userToken: null
};

const mutations: MutationTree<iRootState> = {
  login(state, token: string) {
    state.userToken = token;
  },
  logout(state) {
    state.userToken = null;
  }
};

const actions: ActionTree<iRootState, iRootState> = {};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
