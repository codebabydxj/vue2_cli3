<template>
  <header>
    <nav class="navbar-top">
      <div class="tabs-wrap">
        <slot></slot>
      </div>
      <div class="user-info">
        <el-badge slot="reference" :value="noticeData.total" :hidden="noticeData.total <= 0" :max="99">
          <el-tooltip effect="dark" content="公告" placement="bottom">
            <el-button class="screenfull" type="text"  @click="drawer = true">
              <i class="fa fa-bell-o fa-lg"></i>
            </el-button>
          </el-tooltip>
        </el-badge>
        <el-drawer
          title="公告信息栏"
          size="20%"
          :visible.sync="drawer"
          :with-header="false">
          <span class="notice-span" v-for="item in noticeData.noticeList" :key="item.index" @click="handleMessage(item)">{{ item.title }}</span>
        </el-drawer>
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
        <el-avatar icon="el-icon-user-solid" class="screenfull" :size="25" :src="require(`@/assets/images/logo.png`)"></el-avatar>
        <el-dropdown class="screenfull"  @command="handleCommand">
          <span class="user_name">Admin</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="setCore">设置中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
    <dialog-message
      v-if="isShowMessage"
      :isShowMessage="isShowMessage"
      :noticeObj="noticeObj"
      @messageCb="messageCb">
    </dialog-message>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import screenfull from 'screenfull';

// import * as API from '@/utils/constants/api';

import dialogMessage from './components/dialog-message';

export default {
  components: {
    dialogMessage,
  },
  data() {
    return {
      drawer: false,
      noticeData: {
        total: 10,
        noticeList: [
          {
            title: '公告1',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告2',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告3',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告4',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告5',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告6',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告1',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告2',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告3',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告4',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告5',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告6',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告1',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告2',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告3',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告4',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告5',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告6',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告1',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告2',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告3',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告4',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告5',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
          {
            title: '公告6',
            content: '天气不错',
            time: '2020-03-12 18:52:27',
          },
        ],
      },
      noticeObj: {
        title: '',
        content: '',
        time: '',
      },
      isShowMessage: false,
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
    handleMessage(item) {
      this.noticeObj = item;
      this.isShowMessage = true;
    },
    messageCb() {
      this.isShowMessage = false;
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
  flex: 0 0 auto;
  background-color: #EDF2FC;
  border-bottom: 1px solid #dfe4ed;
}
header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
}
header .navbar-top .tabs-wrap {
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
  margin: 0 0 0 15px;
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
  margin-right: 15px;
}
.notice-span{
  display: block;
  padding: 10px 20px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.notice-span:hover{
  background: #F2F6FC;
  color: #409EFF;
}
</style>
<style>
.el-drawer__container{
  overflow-x: hidden;
}
.el-drawer__body{
  overflow-y: scroll;
}
.el-drawer__body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-drawer__body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #999999;
}
.el-drawer__body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
