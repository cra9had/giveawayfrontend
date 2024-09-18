import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/404",
      component: () => import("./views/404/Index.vue"),
      name: "NOT_FOUND",
    },
    {
      path: "/",
      component: () => import("./views/Index/Index.vue"),
      name: "FIRST",
    },

    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});
