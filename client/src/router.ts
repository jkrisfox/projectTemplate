import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
<<<<<<< HEAD
import MyProfile from "./views/MyProfile.vue";
=======
import Todos from "./views/ToDos.vue";
>>>>>>> adding todo list

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
<<<<<<< HEAD
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
=======
      path: "/todos",
      name: "todos",
      component: Todos
>>>>>>> adding todo list
    }
  ]
});
