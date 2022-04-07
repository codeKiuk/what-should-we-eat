import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import { isAuthenticated } from "@/firebase/auth";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  isAuthenticated().then((user) => {
    if (to.name !== "Login" && !user) {
      next({ name: "Login", replace: true });
    } else if (to.name === "Login" && user) {
      next({ name: "Home", replace: true });
    } else {
      next();
    }
  });
});

export default router;
