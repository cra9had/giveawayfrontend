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
      name: "index",
    },
    {
      path: "/ticket",
      component: () => import("./views/Ticket/Ticket.vue"),
      name: "TICKET",
    },
    {
      path: "/checking/:id(\\d+)", // The regex ensures that 'id' is an integer
      component: () => import("./views/Checking/Checking.vue"),
      name: "checking",
      props: true // This allows passing the route param 'id' as a prop to the component
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
      path: "/todo-condition2",
      component: () => import("./views/Condition/ToDoCondition2.vue"),
      name: "todo-condition2",
    },
    {
      path: "/todo-condition3",
      component: () => import("./views/Condition/ToDoCondition3.vue"),
      name: "todo-condition3",
    },
    {
      path: "/winners",
      component: () => import("./views/Winners/Winners.vue"),
      name: "winners",
    },
    {
      path: "/winners2",
      component: () => import("./views/Winners/Winners2.vue"),
      name: "winners2",
    },
    {
      path: "/winners3",
      component: () => import("./views/Winners/Winners3.vue"),
      name: "winners3",
    },
    {
      path: "/progress",
      component: () => import("./views/Progress/Progress.vue"),
      name: "progress",
    },

    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});
