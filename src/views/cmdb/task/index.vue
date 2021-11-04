<template>
  <div>
    <tips :tips="tips" />

    <!-- 表格功能区 -->
    <div class="table-op">
      <div class="search">
        <el-input
          v-model="query.keywords"
          placeholder="请输入凭证描述|API KEY|用户名 敲回车进行搜索"
          @keyup.enter.native="get_tasks"
        ></el-input>
      </div>
      <div class="op">
        <el-button
          icon="el-icon-refresh"
          type="primary"
          @click="handleAddSecret"
          >资产同步</el-button
        >
      </div>
    </div>

    <!-- 凭证表格 -->
    <div class="box-shadow secret-box">
      <el-table
        :data="tasks"
        v-loading="fetchTaskLoading"
        style="width: 100%"
        tooltip-effect="light"
      >
        <el-table-column prop="secret_description" label="凭证信息">
          <template slot-scope="{ row }">
            {{ row.secret_description }}
          </template>
        </el-table-column>
        <el-table-column prop="region" label="地域" width="120">
          <template slot-scope="{ row }">
            {{ row.region }}
          </template>
        </el-table-column>
        <el-table-column prop="resource_type" label="资源类型" width="120">
          <template slot-scope="{ row }">
            {{ row.resource_type }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="{ row }">
            {{ row.status }} <br />
            <el-tooltip placement="bottom">
              <div slot="content">{{ row.message }}</div>
              <span>{{ row.message.substring(0, 40) + " ..." }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="start_at" label="开始时间">
          <template slot-scope="{ row }">
            {{ row.start_at | parseTime }} <br />
            {{ row.end_at | parseTime }}
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page_number"
        :limit.sync="query.page_size"
        @pagination="get_tasks"
      />
    </div>

    <!-- 添加secret -->
    <create-task
      :visible.sync="showCreateTaskDrawer"
      :regions="regions"
      @created="handleCreated"
    />
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import Pagination from "@/components/Pagination";
import { LIST_TASK } from "@/api/cmdb/task";
import { LIST_REGION } from "@/api/cmdb/enum.js";

import CreateTask from "./components/CreateTask";

const tips = ["资源同步任务管理"];

export default {
  name: "TaskList",
  components: { Tips, Pagination, CreateTask },
  data() {
    return {
      tips,
      tasks: [],
      fetchTaskLoading: false,
      total: 0,
      query: {
        page_size: 20,
        page_number: 1,
        keywords: "",
      },
      showCreateTaskDrawer: false,
      regions: {},
    };
  },
  mounted() {
    this.getRegion();
    this.get_tasks();
  },
  methods: {
    async get_tasks() {
      this.fetchTaskLoading = true;
      try {
        const resp = await LIST_TASK(this.query);
        this.tasks = resp.data.items;
        this.total = resp.data.total;
      } catch (error) {
        this.$notify.error({
          title: "获取凭证异常",
          message: error,
        });
      } finally {
        this.fetchTaskLoading = false;
      }
    },
    handleAddSecret() {
      this.showCreateTaskDrawer = true;
    },
    async getRegion() {
      try {
        const resp = await LIST_REGION();
        this.regions = resp.data;
      } catch (error) {
        this.$notify.error({
          title: "获取Region类型异常",
          message: error,
        });
      }
    },
    handleCreated(val) {
      console.log(val);
      this.get_tasks();
    },
  },
};
</script>

<style scoped>
.secret-box {
  margin-top: 8px;
}

.table-op {
  margin-top: 12px;
  display: flex;
  align-items: center;
}

.op {
  margin-left: auto;
}

.search {
  width: 30%;
}
</style>
