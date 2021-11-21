import Layout from "@/layout";

export default {
  path: "/cmdb",
  component: Layout,
  redirect: "/cmdb/search",
  children: [
    {
      path: "search",
      component: () => import("@/views/cmdb/search/index"),
      name: "ResourceSearch",
    },
    {
      path: "host/list",
      component: () => import("@/views/cmdb/host/index"),
      name: "ResourceHost",
    },
    {
      path: "host/detail",
      component: () => import("@/views/cmdb/host/detail"),
      name: "HostDetail",
    },
    {
      path: "secret/list",
      component: () => import("@/views/cmdb/secret/index"),
      name: "SecretList",
    },
    {
      path: "task/list",
      component: () => import("@/views/cmdb/task/index"),
      name: "TaskList",
    },
  ],
};
