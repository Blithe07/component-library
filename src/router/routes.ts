import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    redirect: "page-layout/pageLayout",
  },
  {
    name: "pageLayout",
    path: "/pageLayout",
    component: () => import("@/views/page-layout/index.vue"),
  },
  {
    name: "ditcts",
    path: "/ditcts",
    component: () => import("@/views/ditcts/index.vue"),
  },
  {
    name: "product",
    path: "/product",
    component: () => import("@/views/product/index.vue"),
  },
  {
    name: "auth",
    path: "/auth",
    component: () => import("@/views/auth/index.vue"),
  },
];
