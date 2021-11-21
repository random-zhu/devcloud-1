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
    {
      path: "user/login_security",
      component: () => import("@/views/admin/user/login_security"),
      name: "LoginSecurity",
    },
    {
      path: "user/list",
      component: () => import("@/views/admin/user/index"),
      name: "UserList",
    },
    {
      path: "user/detail",
      component: () => import("@/views/admin/user/detail"),
      name: "UserDetail",
    },
  ],
};
