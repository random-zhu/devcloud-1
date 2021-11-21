<template>
  <div class="app-container">
    <!-- 基础信息 -->
    <div class="box-shadow detail-basic">
      <el-descriptions title="服务信息">
        <template slot="extra">
          <el-button
            class="fr"
            type="text"
            size="mini"
            @click="handleUpdate(row)"
            >编辑</el-button
          >
        </template>
        <el-descriptions-item label="名称">
          {{ service.name }}
        </el-descriptions-item>
        <el-descriptions-item label="创建人">
          {{ service.creater }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ service.create_at | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </el-descriptions-item>
        <el-descriptions-item label="服务类型">
          {{ service.type }}
        </el-descriptions-item>
        <el-descriptions-item label="服务ID">
          {{ service.id }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ service.update_at | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ service.description }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <el-card class="box-card" style="margin-top: 12px">
      <el-tabs v-model="activeName">
        <el-tab-pane lazy label="服务接入" name="first">
          <service-credential :service="service" />
        </el-tab-pane>
        <el-tab-pane lazy label="功能列表" name="second">
          <service-endpoint :service-id="service.id" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="right"
        label-width="90px"
        style="margin-left: 50px; margin-right: 50px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="submit()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { DESCRIBE_SERVICE } from "@/api/keyauth/micro";
import ServiceEndpoint from "./components/ServiceEndpoint";
import ServiceCredential from "./components/ServiceCredential";

export default {
  name: "ServiceDetail",
  components: { ServiceEndpoint, ServiceCredential },
  directives: {},
  data() {
    return {
      activeName: "first",
      tableKey: 0,
      queryLoading: {},
      service: {},
      endpoints: [],
      total: 0,
      createLoading: false,
      deleteLoading: "",
      listQuery: {
        page_number: 1,
        page_size: 20,
      },
      dialogFormVisible: false,
      dialogFormType: "create",
      form: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称!", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    dialogTitle() {
      return this.dialogFormType === "create" ? "新增服务" : "编辑服务";
    },
    serviceName() {
      return this.$route.query.id;
    },
  },
  created() {
    this.getServiceDetail();
  },
  methods: {
    getServiceDetail() {
      this.queryLoading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        target: ".app-main",
        body: true,
      });
      // 获取用户列表
      DESCRIBE_SERVICE(this.serviceName)
        .then((resp) => {
          this.service = resp.data;
        })
        .finally(() => {
          this.queryLoading.close();
        });
    },
    resetForm() {
      this.form = {
        name: "",
        description: "",
      };
    },
    handleCreate() {
      this.dialogFormType = "create";
      this.resetForm();
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    submit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dialogFormType === "create") {
            // 新建
            this.createService();
          } else {
            // 更新
          }
        }
      });
    },
    createService() {
      this.createLoading = true;
    },
    handleUpdate(row) {
      this.dialogFormType = "update";
      this.form = Object.assign({}, row); // copy obj
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.deleteLoading = row.name;
    },
  },
};
</script>
