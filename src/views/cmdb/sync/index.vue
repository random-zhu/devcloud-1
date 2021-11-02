<template>
  <div>
    <tips :tips="tips" />

    <!-- 表格功能区 -->
    <div class="table-op">
      <div class="search">
        <el-input
          v-model="query.keywords"
          placeholder="请输入凭证描述|API KEY|用户名 敲回车进行搜索"
          @keyup.enter.native="get_secrets"
        ></el-input>
      </div>
      <div class="op">
        <el-button icon="el-icon-plus" type="primary" @click="handleAddSecret"
          >添加凭证</el-button
        >
      </div>
    </div>

    <!-- 凭证表格 -->
    <div class="box-shadow secret-box">
      <el-table
        :data="secrets"
        v-loading="fetchSecretLoading"
        style="width: 100%"
      >
        <el-table-column prop="name" label="描述">
          <template slot-scope="{ row }">
            {{ row.description }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="厂商">
          <template slot-scope="{ row }">
            {{ getEnumDescribe("vendor", row.vendor) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="类型">
          <template slot-scope="{ row }">
            {{ getEnumDescribe("cendential", row.crendential_type) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="凭证">
          <template slot-scope="{ row }">
            {{ row.api_key }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="同步地域">
          <template slot-scope="{ row }">
            {{ row.allow_regions.join(",") }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="创建时间">
          <template slot-scope="{ row }">
            {{ row.create_at | parseTime }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="速率限制">
          <template slot-scope="{ row }">
            {{ row.request_rate }}
          </template>
        </el-table-column>
        <el-table-column prop="操作" align="center" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button
              type="text"
              icon="el-icon-delete"
              style="color: #f56c6c"
              @click="handleDelete(row, $index)"
              :loading="deleteSecretLoading === $index"
              >删除</el-button
            >
            <el-button type="text" icon="el-icon-refresh">同步</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page_number"
        :limit.sync="query.page_size"
        @pagination="get_secrets"
      />
    </div>

    <!-- 添加secret -->
    <add-secret
      :visible.sync="showAddSecretDrawer"
      :vendors="vendors"
      :cendentialTypes="crendentialTypes"
      :regions="regions"
      @created="handleCreated"
    />
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import Pagination from "@/components/Pagination";
import { LIST_SECRET, DELETE_SECRET } from "@/api/cmdb/secret";
import {
  LIST_VENDOR,
  LIST_CRENDENTIAL_TYPE,
  LIST_REGION,
} from "@/api/cmdb/enum.js";

import AddSecret from "./components/AddSecret";

const tips = ["资源同步凭证管理"];

export default {
  name: "ResourceSync",
  components: { Tips, Pagination, AddSecret },
  data() {
    return {
      tips,
      secrets: [],
      fetchSecretLoading: false,
      total: 0,
      query: {
        page_size: 20,
        page_number: 1,
        keywords: "",
      },
      showAddSecretDrawer: false,
      vendors: [],
      crendentialTypes: [],
      regions: {},
      deleteSecretLoading: -1,
    };
  },
  mounted() {
    this.getVendors();
    this.getCrendentialTypes();
    this.getRegion();
    this.get_secrets();
  },
  methods: {
    async get_secrets() {
      this.fetchSecretLoading = true;
      try {
        const resp = await LIST_SECRET(this.query);
        this.secrets = resp.data.items;
        this.total = 0;
      } catch (error) {
        this.$notify.error({
          title: "获取凭证异常",
          message: error,
        });
      } finally {
        this.fetchSecretLoading = false;
      }
    },
    handleAddSecret() {
      this.showAddSecretDrawer = true;
    },
    async getVendors() {
      try {
        const resp = await LIST_VENDOR();
        this.vendors = resp.data;
      } catch (error) {
        this.$notify.error({
          title: "获取厂商异常",
          message: error,
        });
      }
    },
    async getCrendentialTypes() {
      try {
        const resp = await LIST_CRENDENTIAL_TYPE();
        this.crendentialTypes = resp.data;
      } catch (error) {
        this.$notify.error({
          title: "获取凭证类型异常",
          message: error,
        });
      }
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
    getEnumDescribe(t, v) {
      let showVendor = v;
      switch (t) {
        case "vendor":
          this.vendors.forEach((item) => {
            if (item.value === v) {
              showVendor = item.describe;
            }
          });
          break;
        case "cendential":
          this.crendentialTypes.forEach((item) => {
            if (item.value === v) {
              showVendor = item.describe;
            }
          });
          break;
      }
      return showVendor;
    },
    handleCreated(val) {
      console.log(val);
      this.get_secrets();
    },
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该凭证, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.deleteSecretLoading = index;
        try {
          let resp = await DELETE_SECRET(row.id);
          console.log(resp);
          this.get_secrets();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } catch (error) {
          this.$message({
            type: "error",
            message: error,
          });
        } finally {
          this.deleteSecretLoading = -1;
        }
      });
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
