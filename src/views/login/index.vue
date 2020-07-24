<template>
  <div class="bg login">
    <div class="layout">
      <div class="title">后台管理系统</div>
      <div class="main">
        <div class="title-icon">
          <img src="/static/login-icon.png" alt="">
        </div>
        <el-form class="form" ref="loginForm" label-position="top" :model="searchForm" :rules="rules" @keyup.enter.native="submitForm">
          <span class="cicle">登录</span>
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" v-model.trim="searchForm.username" name="username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" auto-complete="off" v-model="searchForm.password"></el-input>
          </el-form-item>
          <el-form-item class="valicode" prop="checkCode">
            <el-input type="text" placeholder="请输入验证码" auto-complete="off" v-model="searchForm.checkCode">
              <img slot="append" alt="验证码" width="100" height="38" :src="valiCodeImg" @click="handleValiCode">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="searchForm.isRemember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" :loading="loading" @click="submitForm">登 录</el-button>
            <el-button class="reset-btn"  @click="resetForm">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import * as API from '@/utils/constants/api';
import Cookies from '@/utils/storage/cookies';
import env from '@/utils/config/env';
import des from '@/utils/string-handle/des-encrypt';

export default {
  data() {
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error());
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error());
      } else {
        callback();
      }
    };
    const checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error());
      } else {
        callback();
      }
    };
    return {
      searchForm: {
        username: '',
        password: '',
        checkCode: '',
        isRemember: false,
      },
      rules: {
        username: [
          { validator: checkAccount, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkCode: [
          { validator: checkCode, trigger: 'blur' },
        ],
      },
      valiCodeImg: '/static/login-bg.png',
      loading: false,
    };
  },
  mounted() {
    this.handleValiCode();
    // 判断是否记住密码
    const username = Cookies.get(`${env}.remember.login`); // 后台会在登录之后set一些key，我们直接取值解析
    if (username) {
      this.searchForm.username = username;
      this.searchForm.password = des(username);
      this.searchForm.isRemember = true;
    }
  },
  methods: {
    handleValiCode() {
      // this.valiCodeImg = `${API.baseUrl}${API.authCheckCode}?${Math.random()}`;
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.beforeLogin();
        }
      });
    },
    beforeLogin() {
      this.loading = true;
      if (this.validateIsRememberLogin()) {
        this.loginRemember();
      } else {
        this.login();
      }
    },
    validateIsRememberLogin() {
      let isRememberLogin = false;
      const pwd = des(this.searchForm.username);
      if (pwd === this.searchForm.password) {
        isRememberLogin = true;
      }
      return isRememberLogin;
    },
    loginRemember() {
      this.$router.replace('/');
      // const params = {
      //   checkCode: this.searchForm.checkCode,
      //   isRemember: this.searchForm.isRemember,
      // };
      // this.$http.post(API.rememberLogin, params, API.formDataConfig)
      //   .then(() => {
      //     this.$router.replace('/');
      //   }).catch(() => {
      //     this.handleValiCode();
      //   }).finally(() => {
      //     this.loading = false;
      //   });
    },
    login() {
      if (this.searchForm.isRemember) {
        Cookies.set(`${env}.remember.login`, '123', {});
      } // 测试
      this.$router.replace('/');
      // const params = { ...this.searchForm };
      // params.password = des(params.password);
      // this.$http.post(API.login, params, API.formDataConfig)
      //   .then(() => {
      //     this.$router.replace('/');
      //   }).catch(() => {
      //     this.handleValiCode();
      //   }).finally(() => {
      //     this.loading = false;
      //   });
    },
    resetForm() {
      this.searchForm.username = '';
      this.searchForm.password = '';
      this.searchForm.checkCode = '';
    },
  },
};
</script>

<style lang="scss">
.login.bg {
  background: url("/static/login-bg.png") center no-repeat;
  background-size: cover;
  height: 100%;
}
.login {
  & .layout {
    width: 350px;
    margin: 0 auto 0;
    & .title {
      color: #3f87e0;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      padding: 130px 0 20px 0;
    }
    & .main {
      position: relative;
      & .title-icon {
        text-align: center;
        position: absolute;
        top: -100px;
        left: 50%;
        transform: translate(-50%);
        img {
          width: 364px;
          height: 269px;
        }
      }
      & .form {
        margin-top: 80px;
        background-color: #fff;
        padding: 52px 20px 20px 20px;
        position: relative;
        border: 1px solid rgba(100, 100, 100, .2);
        box-shadow: 0 0 6px #d8dce5;
        .cicle {
          background-color: #4087e0;
          color: #fff;
          border-radius: 100%;
          width: 70px;
          height: 70px;
          line-height: 70px;
          font-size: 18px;
          display: inline-block;
          text-align: center;
          position: absolute;
          top: -38px;
          left: 50%;
          transform: translate(-50%);
          border: 3px solid rgba(255, 255, 255, .8);
        }
        .login-btn {
          width: calc(50% - 5px);
        }
        .reset-btn {
          width: calc(50% - 5px);
        }
      }
      & .form .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
}
// .login .valicode .el-input-group--append {
//   padding: 0;
// }
.login .valicode .el-input-group__append {
  border: 0;
  padding: 0 0 0 5px;
}
.login .el-form-item__error {
  display: none;
}
</style>
