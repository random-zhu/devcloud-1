<template>
  <div>
    <!-- 添加凭证表单 -->
    <el-drawer
      title="添加凭证"
      :visible.sync="isVisible"
      :before-close="handleClose"
      :withHeader="false"
      size="40%"
    >
      <div class="add-secret-form">
        <el-form ref="addSecretForm" :model="form" :rules="rules">
          <el-form-item
            label="厂商"
            :label-width="formLabelWidth"
            prop="vendor"
          >
            <el-radio-group @change="changeVendor" v-model="form.vendor">
              <el-radio-button
                v-for="item in vendors"
                :key="item.value"
                :label="item.value"
              >
                {{ item.describe }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="类型"
            :label-width="formLabelWidth"
            prop="crendential_type"
          >
            <el-radio-group disabled v-model="form.crendential_type">
              <el-radio-button
                v-for="item in cendentialTypes"
                :key="item.value"
                :label="item.value"
              >
                {{ item.describe }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div v-if="form.crendential_type === 'API_KEY'">
            <el-form-item
              label="API Key"
              :label-width="formLabelWidth"
              prop="api_key"
            >
              <el-input
                v-model="form.api_key"
                placeholder="请输入API Key"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="API Secret"
              :label-width="formLabelWidth"
              prop="api_secret"
            >
              <el-input
                v-model="form.api_secret"
                placeholder="请输入API Secret"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Region"
              :label-width="formLabelWidth"
              prop="allow_regions"
            >
              <el-select
                v-model="form.allow_regions"
                multiple
                filterable
                placeholder="请选择Region"
              >
                <el-option
                  v-for="item in regionOptions"
                  :key="item.value"
                  :label="item.describe"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-if="form.crendential_type === 'PASSWORD'">
            <el-form-item
              label="服务地址"
              :label-width="formLabelWidth"
              prop="address"
            >
              <el-input
                v-model="form.address"
                placeholder="请输入服务地址"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户名"
              :label-width="formLabelWidth"
              prop="username"
            >
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="速率限制" :label-width="formLabelWidth">
            <el-input
              v-model="form.request_rate"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="description"
          >
            <el-input
              v-model="form.description"
              placeholder="请输入凭证描述"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="drawer-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            :loading="addSecretLoading"
            @click="submit"
            >{{ addSecretLoading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { ADD_SECRET } from "@/api/cmdb/secret.js";

export default {
  name: "AddSecret",
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    vendors: {
      default() {
        return [];
      },
      type: Array,
    },
    cendentialTypes: {
      default() {
        return [];
      },
      type: Array,
    },
    regions: {
      default() {
        return {};
      },
      type: Object,
    },
  },
  data() {
    return {
      form: {
        description: "",
        vendor: "",
        crendential_type: "",
        api_key: "",
        api_secret: "",
        request_rate: 5,
        address: "",
        username: "",
        password: "",
        allow_regions: [],
      },
      formLabelWidth: "120px",
      addSecretLoading: false,
      rules: {
        api_key: [
          { required: true, message: "请输入API Key", trigger: "blur" },
        ],
        api_secret: [
          { required: true, message: "请输入API Secret", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入服务地址", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        description: [
          { required: true, message: "请输入凭证描述", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    visible: {
      handler(newV) {
        if (newV) {
          this.form.vendor = this.vendors[0].value;
          this.form.crendential_type = this.cendentialTypes[0].value;
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleClose() {
      this.$refs["addSecretForm"].clearValidate();
      this.$emit("update:visible", false);
    },
    cancelForm() {
      this.$refs["addSecretForm"].clearValidate();
      this.addSecretLoading = false;
      this.$emit("update:visible", false);
    },
    changeVendor(val) {
      if (val === "VSPHERE") {
        this.form.crendential_type = "PASSWORD";
      } else {
        this.form.crendential_type = "API_KEY";
      }
      this.form.allow_regions = [];
    },
    submit() {
      this.$refs["addSecretForm"].validate(async (valid) => {
        if (valid) {
          this.addSecretLoading = true;
          try {
            let resp = await ADD_SECRET(this.form);
            this.$emit("created", resp);
            this.$emit("update:visible", false);
            this.$refs["addSecretForm"].resetFields();
          } catch (error) {
            this.$notify.error({
              title: "创建凭证异常",
              message: error,
            });
          } finally {
            this.addSecretLoading = false;
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
    regionOptions: {
      get() {
        return this.regions[this.form.vendor];
      },
    },
  },
};
</script>

<style scoped>
.add-secret-form {
  padding: 20px 20px;
}
.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
