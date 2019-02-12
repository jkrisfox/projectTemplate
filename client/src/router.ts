import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ToDos from "./views/ToDos.vue";
import MyProfile from "./views/MyProfile.vue";
import NewProduct from "./views/NewProduct.vue";

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
      path: "/services",
      name: "service",
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Services.vue")
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    },
    {
      path: "/products",
      name: "products",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "products" */ "./views/Products.vue")
    },
    {
      path: "/products/newproduct",
      name: "newProduct",
      component: NewProduct
    }
  ]
});
