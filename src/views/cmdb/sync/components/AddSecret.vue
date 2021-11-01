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
        <el-form ref="addSecretForm" :model="form">
          <el-form-item label="厂商" :label-width="formLabelWidth">
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
          <el-form-item label="类型" :label-width="formLabelWidth">
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
          <div v-if="form.crendential_type === 'CRENDENTIAL_API_KEY'">
            <el-form-item label="API Key" :label-width="formLabelWidth">
              <el-input
                v-model="form.api_key"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="API Secret" :label-width="formLabelWidth">
              <el-input
                v-model="form.api_secret"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="Region" :label-width="formLabelWidth">
              <el-select
                v-model="form.allow_regions"
                multiple
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
          <div v-if="form.crendential_type === 'CRENDENTIAL_PASSWORD'">
            <el-form-item label="Address" :label-width="formLabelWidth">
              <el-input
                v-model="form.address"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="Username" :label-width="formLabelWidth">
              <el-input
                v-model="form.username"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
              <el-input
                v-model="form.password"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="速率限制" :label-width="formLabelWidth">
            <el-input
              v-model="form.request_rate"
              placeholder="请输入内容"
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
        return [];
      },
      type: Array,
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
        request_rate: 0.2,
        address: "",
        username: "",
        password: "",
        allow_regions: [],
      },
      formLabelWidth: "80px",
      addSecretLoading: false,
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
      this.$emit("update:visible", false);
    },
    cancelForm() {
      this.addSecretLoading = false;
      this.$emit("update:visible", false);
    },
    changeVendor(val) {
      if (val === "VENDOR_VSPHERE") {
        this.form.crendential_type = "CRENDENTIAL_PASSWORD";
      } else {
        this.form.crendential_type = "CRENDENTIAL_API_KEY";
      }
    },
    submit() {},
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
