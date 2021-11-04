<template>
  <div>
    <!-- 添加凭证表单 -->
    <el-drawer
      title="资源同步"
      :visible.sync="isVisible"
      :before-close="handleClose"
      :withHeader="false"
      size="40%"
    >
      <div class="create-task-form">
        <el-form ref="createTaskForm" :model="form" :rules="rules">
          <el-form-item
            label="凭证"
            :label-width="formLabelWidth"
            prop="secret_id"
          >
            <el-select
              v-model="form.secret_id"
              placeholder="请选择用于同步的凭证"
              @visible-change="loadSecret"
              :loading="fetchSecretLoading"
              @change="handleSecretChanged"
              class="select-input"
            >
              <el-option
                v-for="item in secrets"
                :key="item.id"
                :label="item.description"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="地域"
            :label-width="formLabelWidth"
            prop="region"
          >
            <el-select
              v-model="form.region"
              placeholder="请选择用于需要同步的地域"
              class="select-input"
              :disabled="this.form.secret_id === ''"
            >
              <el-option
                v-for="item in vendorRegions"
                :key="item.value"
                :label="item.describe"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="资源类型"
            :label-width="formLabelWidth"
            prop="resource_type"
          >
            <el-select
              v-model="form.resource_type"
              placeholder="请选择用于需要同步的资源类型"
              class="select-input"
              :disabled="this.form.secret_id === ''"
            >
              <el-option
                v-for="item in vendorResourceTypes"
                :key="item.value"
                :label="item.describe"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="drawer-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            :loading="createTasktLoading"
            @click="submit"
            >{{ createTasktLoading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { CREATE_TASK } from "@/api/cmdb/task";
import { LIST_SECRET } from "@/api/cmdb/secret";

export default {
  name: "CreateTask",
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    regions: {
      default() {
        return {};
      },
      type: Object,
    },
    resourceTypes: {
      default() {
        return {};
      },
      type: Object,
    },
  },
  data() {
    return {
      fetchSecretLoading: false,
      secrets: [],
      vendorRegions: [],
      vendorResourceTypes: [],
      form: {
        secret_id: "",
        region: "",
        resource_type: "",
      },
      formLabelWidth: "120px",
      createTasktLoading: false,
      rules: {
        secret_id: [
          { required: true, message: "选择用于同步的凭证", trigger: "blur" },
        ],
        region: [
          { required: true, message: "选择同步资源的地域", trigger: "blur" },
        ],
        resource_type: [
          {
            required: true,
            message: "选择需要同步资源的类型",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    visible: {
      handler(newV) {
        if (newV) {
          console.log(newV);
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleClose() {
      this.$refs["createTaskForm"].clearValidate();
      this.$emit("update:visible", false);
    },
    cancelForm() {
      this.$refs["createTaskForm"].clearValidate();
      this.createTasktLoading = false;
      this.$emit("update:visible", false);
    },
    loadSecret(val) {
      if (val && this.secrets.length === 0) {
        this.get_secrets();
      }
    },
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
    handleSecretChanged(val) {
      this.secrets.forEach((item) => {
        if (item.id === val) {
          this.vendorRegions = this.regions[item.vendor];
          this.vendorResourceTypes = this.resourceTypes[item.vendor];
        }
      });
    },
    submit() {
      this.$refs["createTaskForm"].validate(async (valid) => {
        if (valid) {
          this.createTasktLoading = true;
          try {
            let resp = await CREATE_TASK(this.form);
            this.$emit("created", resp);
            this.$emit("update:visible", false);
            this.$refs["createTaskForm"].resetFields();
          } catch (error) {
            this.$notify.error({
              title: "创建凭证异常",
              message: error,
            });
          } finally {
            this.createTasktLoading = false;
          }
        }
      });
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
};
</script>

<style scoped>
.create-task-form {
  padding: 20px 20px;
}

.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-input {
  width: 100%;
}
</style>
