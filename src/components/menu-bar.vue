<template>
  <nav class="navbar-side">
    <div class="collapse-wrap">
      <el-switch active-color="#878D99" inactive-color="#878D99" v-model="isCurCollapse"></el-switch>
    </div>
    <h4 v-if="isCurCollapse" style="textAlign: center; color: #fff">后台管理系统</h4>
    <div class="search-wrap" :class="{'search-wrap-active': isCurCollapse}">
      <input class="search-input" placeholder="请输入关键词" name="searchInput" autocomplete="off" v-model="searchInput">
      <i class="fa fa-lg fa-search search-icon"></i>
    </div>
    <div class="search-btn" v-if="!isCurCollapse" @click="searchTog">
      <i class="fa fa-lg fa-search"></i>
    </div>
    <el-menu
      ref="menu"
      class="el-menu-vertical-demo"
      background-color="#2d2f33"
      text-color="#f5f7fa"
      active-text-color="#eb9e05"
      :unique-opened="true"
      :collapse="!isCurCollapse"
      :default-active="currentRoute.split('?')[0] === '/' ? '/welcome' : currentRoute.split('?')[0]">
      <el-submenu
        v-for="routeWrap in routerConfigFilterd"
        :index="routeWrap.classify"
        :key="routeWrap.classify"
        @click.native="ubfold(routeWrap.classify)">
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
      searchInput: '',
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
        const reg = new RegExp(this.searchInput, 'i');
        // 匹配子菜单
        routerWrapDeepClone.routes = routeWrap.routes.filter(route => reg.test(route.title));
        return routerWrapDeepClone;
      });
      return routerConfigFilterd.filter(item => item.routes.length);
    },
  },
  watch: {
    isCurCollapse() {
      this.$emit('isCurCollapseChange', this.isCurCollapse);
    },
  },
  methods: {
    routeGo(title, route) {
      if (route === this.currentRoute) return;
      this.$openView(route);
    },
    ubfold(classify) {
      if (!this.isCurCollapse) {
        this.isCurCollapse = true;
        setTimeout(() => {
          this.$ref.menu.open(classify);
        }, 1000);
      }
    },
    searchTog() {
      this.isCurCollapse = true;
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
nav.navbar-side .el-menu>.el-submenu.is-opened>.el-menu>.el-menu-item.is-active::after {
  content: '';
  display: block;
  position: absolute;
  width: 0px;
  height: 0px;
  border-right: 8px solid #fff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  right: 0;
  top: 18px;
}
nav.navbar-side .search-wrap {
  transition: all 0.7s;
  width: 0;
  height: 0;
  margin: 0;
  border-bottom: 1px solid #878d99;
  overflow: hidden;
}
nav.navbar-side .search-wrap .search-input {
  width: 135px;
  color: #edf2fc;
  font-size: 14px;
  background-color: transparent;
  padding: 0 30px0 5px;
  border: none;
  outline: none;
}
nav.navbar-side .search-wrap .search-input::-webkit-input-placeholder {
  color: #878d99;
}
nav.navbar-side .search-wrap .search-input::-moz-placeholder {
  color: #878d99;
}
nav.navbar-side .search-wrap .search-input::-ms-input-placeholder {
  color: #878d99;
}
nav.navbar-side .search-wrap .search-icon {
  color: #878d99;
  float: right;
  margin-right: 8px;
  margin-top: 5px;
}
nav.navbar-side .search-wrap.search-wrap-active {
  width: 170px;
  height: 28px;
  margin: 15px;
  line-height: 28px;
}
nav.navbar-side .search-btn {
  height: 56px;
  cursor: pointer;
  line-height: 56px;
  transition: background-color .3s,color .3s;
}
nav.navbar-side .search-btn i {
  color: #878d99;
  padding-left: 22px;
}
.collapse-wrap {
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
