"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var Home_vue_1 = require("./views/Home.vue");
vue_1["default"].use(vue_router_1["default"]);
exports["default"] = new vue_router_1["default"]({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home_vue_1["default"]
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () {
                return Promise.resolve().then(function () { return require(/* webpackChunkName: "about" */ "./views/About.vue"); });
            }
        },
        {
            path: "/ToDos",
            name: "ToDos",
            component: ToDos
        }
    ]
});
