<template>
  <div>
    <el-menu
      default-active="/admin/micro/list"
      :default-openeds="['/cmdb/micro']"
      class="sidebar-el-menu"
      :collapse="isCollapse"
      router
    >
      <el-submenu index="/admin/micro">
        <!-- 添加个title -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">服务管理</span>
        </template>
        <!-- 导航条目 -->
        <el-menu-item index="/admin/micro/list">服务列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  props: {
    isCollapse: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
