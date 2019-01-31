"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
vue_1["default"].use(vuex_1["default"]);
var state = {
    userToken: null
};
var mutations = {
    login: function (state, token) {
        state.userToken = token;
    },
    logout: function (state) {
        state.userToken = null;
    }
};
var actions = {};
exports["default"] = new vuex_1["default"].Store({
    state: state,
    mutations: mutations,
    actions: actions
});
