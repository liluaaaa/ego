<template>
  <div class="slider">
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item index="">
        <span slot="title">后台易购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{$t("home.product")}}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{$t("home.guige")}}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-document"></i>
        <span slot="title">{{$t("home.advert")}}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{$t("home.user")}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  height: 100%;
  background: #545c64;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: 0;
  }
}
</style>