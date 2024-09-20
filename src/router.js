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
      path: "/ticket",
      component: () => import("./views/Ticket/Ticket.vue"),
      name: "TICKET",
    },
    {
      path: "/checking",
      component: () => import("./views/Checking/Checking.vue"),
      name: "CHECKING",
    },
    {
      path: "/condition",
      component: () => import("./views/Condition/Condition.vue"),
      name: "condition",
    },
    {
      path: "/todo-condition",
      component: () => import("./views/Condition/ToDoCondition.vue"),
      name: "todo-condition",
    },
   {
      path: "/winners",
      component: () => import("./views/Winners/Winners.vue"),
      name: "winners",
    },

    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});
