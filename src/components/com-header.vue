<template>
  <header>
    <nav class="navbar-top">
      <div class="tabs-warp">
        <slot></slot>
      </div>
      <div class="user-info">
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-button class="screenfull" type="text" @click="refresh">
            <i class="fa fa-refresh fa-lg"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-button class="screenfull" type="text" @click="screenfullTog">
            <i class="fa fa-arrows-alt fa-lg"></i>
          </el-button>
        </el-tooltip>
        <el-dropdown class="screenfull"  @command="handleCommand">
          <el-avatar :size="30" icon="el-icon-user-solid" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
          <span class="user_name">Admin</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import screenfull from 'screenfull';

// import * as API from '@/utils/constants/api';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    refresh() {
      this.$refreshView();
    },
    screenfullTog() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      } else {
        this.$message({
          showClose: true,
          message: '浏览器不能全屏',
          type: 'warning',
        });
      }
    },
    handleCommand(command) {
      // 退出登录
      if (command === 'logout') {
        // const loading = this.$loading({ lock: true });
        // this.$http.get(API.loginOut)
        // .then(() => {
        //   this.$store.commit('logout');
        //   this.$router.replace('/login');
        // }).catch(() => {
        // }).finally(() => {
        //   loading.close();
        // });
        this.$store.commit('logout');
        this.$router.replace('/login');
      }
      // 个人中心
      // 设置中心
    },
  },
};
</script>

<style scoped>
header {
  height: 40px;
  background-color: #EDF2FC;
  border-bottom: 1px solid #dfe4ed;
}
header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
}
header .navbar-top .tabs-warp {
  flex: 1 1 auto;
  width: calc(100% - 250px);
}
header .navbar-top .user-info {
  flex: 0 0 auto;
  width: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
header .navbar-top .user-info .screenfull {
  margin: 0 15px 0 0;
  padding: 0;
  color: inherit;
  cursor: pointer;
}
.user_name {
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  line-height: 30px;
  padding-left: 10px;
}
</style>
