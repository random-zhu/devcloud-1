<template>
  <div class="wrapper"></div>
</template>

<script>
import { QUERY_DEPARTMENT } from "@/api/keyauth/department";

const listQuery = {
  parent_id: "",
  with_sub_count: true,
  page_number: 1,
  page_size: 2000,
};

export default {
  name: "ChoiceDepartment",
  props: {
    department: {
      default: "",
      type: String,
    },
    valueAttr: {
      default: "id",
      type: String,
    },
  },
  data() {
    return {
      options: [],
      total: 0,
    };
  },
  computed: {
    currentdepartment: {
      get() {
        console.log(this.department);
        if (this.department === "") {
          return null;
        }
        return this.department;
      },
      set(val) {
        console.log(val);
        this.$emit("update:department", val);
        this.$emit("change", val);
      },
    },
  },
  mounted() {
    this.queryRootDepartment();
  },
  methods: {
    queryRootDepartment() {
      listQuery.parent_id = ".";
      QUERY_DEPARTMENT(listQuery).then((resp) => {
        this.total = resp.data.total;
        resp.data.items.forEach((item) => {
          item.label = item.name + " (" + item.manager + ")";
          if (item.sub_count !== 0) {
            item.children = null;
          }
          this.options.push(item);
        });
      });
    },
  },
};
</script>

<style lang="scss">
.vue-treeselect__control {
  border-radius: 0px;
}
.el-form-item__content {
  font-size: 12px;
  color: #606266;
}
</style>
