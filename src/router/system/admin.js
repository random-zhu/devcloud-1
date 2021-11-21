import Layout from "@/layout";

export default {
  path: "/admin",
  component: Layout,
  redirect: "/admin/micro/list",
  children: [
    {
      path: "micro/list",
      component: () => import("@/views/admin/micro/index"),
      name: "ServiceList",
    },
    {
      path: "micro/detail",
      component: () => import("@/views/admin/micro/detail"),
      name: "ServiceDetail",
    },
  ],
};
