<template>
  <div class="login">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="username"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="second">
        <zhuce />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import zhuce from "./zhuce.vue";
//解析token
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  components: { zhuce },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback("请输入账号");
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setUser"]),
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //通过验证 获取输入的值
          //console.log("输入的值：", this.ruleForm);
          //登录请求
          let { username, password } = this.ruleForm;
          this.$api
            .getLogin({
              username,
              password,
            })
            .then((res) => {
              console.log("登录：", res);
              if (res.status === 200) {
                //解析token
                //console.log(jwt(res.data));
                //存储到vuex  存储本地  跳转到首页
                let obj = {
                  user: jwt(res.data).username,
                  token: res.data,
                };
                this.setUser(obj);
                localStorage.setItem("userinfo", JSON.stringify(obj));
                //返回首页
                this.$router.push("/");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.login {
  width: 500px;
  height: 300px;
  margin: 100px auto;
  border: 1px solid #eee;
  padding: 30px;
}
</style>