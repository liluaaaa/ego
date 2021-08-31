<template>
  <div class="layout">
    <!-- 侧边导航 -->
    <MySlider :isCollapse="isCollapse" />
    <!-- 右边内容 -->
    <div class="main-content">
      <div class="top-header">
        <div class="left">
          <i
            class="iconfont"
            :class="{
              'icon-right-indent': !isCollapse,
              'icon-left-indent': isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="userinfo">
          <el-dropdown class="msg" @command="handleCommand">
            <span class="el-dropdown-link">
              语言选择<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='zh'>中文</el-dropdown-item>
              <el-dropdown-item command='en'>英文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>hello {{ userinfo.user }}</span>
          <i class="iconfont icon-tuichu" @click="loginOut"></i>
        </div>
      </div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MySlider from "../../components/Myslide.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState("LoginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("LoginModule", ["clearUser"]),
    loginOut() {
      //清除vuex 清空本地  跳转登录
      this.clearUser();
      localStorage.removeItem("userinfo");
      this.$router.push("/login");
    },
    //语言
    handleCommand(command){
      // console.log('语言：',command);
      this.$i18n.locale=command
    }
  },
  components: {
    MySlider,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .main-content {
    flex: 1;
    .top-header {
      background: #1e78bf;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      .left {
        flex: 1;
      }
      .iconfont {
        font-size: 24px;
        color: #fff;
        padding-left: 10px;
      }
      .userinfo {
        color: #fff;
        vertical-align: middle;
        padding-right: 20px;
      }
      .msg{
        margin-right: 10px;
        color:#fff;
      }
    }
    .content {
      margin: 20px;
    }
  }
}
</style>