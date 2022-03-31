import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import { firebaseAuth } from "@/main";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Default",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !firebaseAuth.currentUser) {
    next({ name: "Login" });
  } else if (to.name === "Login" && firebaseAuth.currentUser) {
    next({ name: "Home" });
  } else next();
});

export default router;
