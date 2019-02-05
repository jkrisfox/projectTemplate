import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
<<<<<<< HEAD
import ToDos from "./views/ToDos.vue";
import newItm from "./views/newitem.vue";
=======
import MyProfile from "./views/MyProfile.vue";
>>>>>>> 425c78e09634ac36f3e8ad2748809c8921d788f7

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
      path: "/todos",
      name: "/todos",
      component: ToDos
    },
    {
      path: "/newItm",
      name: "/newItm",
      component: newItm
=======
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
>>>>>>> 425c78e09634ac36f3e8ad2748809c8921d788f7
    }
  ]
});
