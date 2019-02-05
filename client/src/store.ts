import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { iUser } from "@/models/user.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  userId: number | null;
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  userId: null
};

const mutations: MutationTree<iRootState> = {
  login(state, payload: iLoginPayload) {
    state.userToken = payload.token;
    state.userId = payload.userid;
  },
  logout(state) {
    state.userToken = null;
    state.userId = null;
  }
};

const actions: ActionTree<iRootState, iRootState> = {};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
