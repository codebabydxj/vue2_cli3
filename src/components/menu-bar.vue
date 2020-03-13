<template>
  <nav class="navbar-side">
    <div class="collapse-warp">
      <el-switch active-color="#878D99" inactive-color="#878D99" v-model="isCurCollapse"></el-switch>
    </div>
    <h4 v-if="isCurCollapse" style="textAlign: center; color: #fff">后台管理系统</h4>
    <el-menu
      ref="menu"
      class="el-menu-vertical-demo"
      background-color="#2d2f33"
      text-color="#f5f7fa"
      active-text-color="#eb9e05"
      :unique-opened="true"
      :collapse="!isCurCollapse"
      @open="handleOpen"
      @close="handleClose"
      :default-active="currentRoute.split('?')[0] === '/' ? '/welcome' : currentRoute.split('?')[0]">
      <el-submenu
        v-for="routeWrap in routerConfigFilterd"
        :index="routeWrap.classify"
        :key="routeWrap.classify">
        <template slot="title">
          <i :class="`el-icon-${routeWrap.icon}`"></i>
          <span slot="title">{{ routeWrap.title }}</span>
        </template>
        <el-menu-item
          v-for="route in routeWrap.routes"
          :index="route.path"
          :key="route.path.split('?')[0]"
          @click="routeGo(route.title, route.path)">
          {{ route.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </nav>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapState } from 'vuex';

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCurCollapse: this.isCollapse,
    };
  },
  computed: {
    ...mapState({
      routes: state => state.routes,
      currentRoute: state => state.currentRoute,
      routerConfig: (state) => {
        // 过滤没有权限的路由
        const routerConfig = state.routerConfig.filter(v => v.access); // 过滤一级,默认router-config中access设置为false
        routerConfig.forEach((level) => {
          level.routes = level.routes.filter(item => level.access && item.access); // 过滤二级
        });
        // 根据sort排序
        routerConfig.sort((x, y) => x.sort - y.sort); // 一级菜单排序
        routerConfig.forEach((level) => {
          level.routes.sort((x, y) => x.sort - y.sort); // 二级菜单排序
        });
        return routerConfig;
      },
    }),
    routerConfigFilterd() {
      const routerConfigFilterd = this.routerConfig.map((routeWrap) => {
        const routerWrapDeepClone = cloneDeep(routeWrap);
        return routerWrapDeepClone;
      });
      return routerConfigFilterd.filter(item => item.routes.length);
    },
  },
  created() {
    console.log(this.currentRoute.split('?')[0]);
  },
  methods: {
    routeGo(title, route) {
      if (route === this.currentRoute) return;
      this.$openView(route);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
nav.navbar-side {
  flex: 0 0 auto;
  background-color: #2d2f33;
  overflow-x: hidden;
  overflow-y: auto;
}
nav.navbar-side .el-menu>.el-submenu>.el-submenu__title {
  background-color: #2d2f33!important;
}
nav.navbar-side .el-menu>.el-submenu>.el-submenu__title:hover {
  color: #eb9e05!important;
}
nav.navbar-side .el-menu>.el-submenu.is-opened>.el-submenu__title,
nav.navbar-side .el-menu>.el-submenu.is-opened>.el-menu,
nav.navbar-side .el-menu>.el-submenu.is-opened>.el-menu>.el-menu-item {
  background-color: #5a5e66!important;
}
nav.navbar-side .el-menu>.el-submenu>.el-menu>.el-menu-item {
  padding: 0 50px!important;
}
nav.navbar-side .el-menu>.el-submenu.is-opened>.el-menu>.el-menu-item:hover {
  color: #eb9e05!important;
}
.collapse-warp {
  text-align: center;
  padding: 5px 0;
  margin-top: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
nav.navbar-side .el-menu {
  border-right: none;
}
</style>
