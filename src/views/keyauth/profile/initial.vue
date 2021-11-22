<template>
  <div class="app-container">
    <user-initial />
  </div>
</template>

<script>
import { GET_PROFILE } from "@/api/keyauth/profile";
import UserInitial from "./components/UserInitial";

export default {
  name: "DashboardEditor",
  components: { UserInitial },
  data() {
    return {
      profile: {
        is_initialized: true,
      },
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      this.profile = await GET_PROFILE();
    },
  },
};
</script>

<style lang="scss" scoped></style>
