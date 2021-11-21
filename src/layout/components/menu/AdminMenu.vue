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
          <i class="el-icon-s-grid"></i>
          <span slot="title">服务管理</span>
        </template>
        <!-- 导航条目 -->
        <el-menu-item index="/admin/micro/list">服务列表</el-menu-item>
      </el-submenu>

      <el-submenu index="/admin/user">
        <!-- 添加个title -->
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </template>
        <!-- 导航条目 -->
        <el-menu-item index="/admin/user/login_security">登录安全</el-menu-item>
        <el-menu-item index="/admin/user/list">用户列表</el-menu-item>
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
