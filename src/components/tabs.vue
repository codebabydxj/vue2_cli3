<template>
  <div class="tabs">
    <el-tabs v-model="currentRoute" type="card" closable @tab-click="tabClick" @tab-remove="removeTab" @contextmenu.prevent.native="openMenu($event)">
      <el-tab-pane
        v-for="item in routes"
        :key="item.route"
        :label="item.title"
        :name="item.route">
      </el-tab-pane>
    </el-tabs>
    <ul class="contextmenu" v-show="visable" :style="{left: left + 'px', top: top + 'px'}">
      <li @click="closeOthers">关闭其他</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      visable: false,
      top: 0,
      left: 0,
    };
  },
  computed: {
    ...mapState({
      routes: state => state.routes,
    }),
    currentRoute: {
      get() {
        return this.$store.state.currentRoute;
      },
      set() {},
    },
  },
  watch: {
    visable(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  created() {
    this.$initNav();
  },
  methods: {
    removeTab(route) {
      this.$closeView(route);
    },
    tabClick(obj) {
      if (obj.name === this.currentRoute) return;
      this.$openView(obj.name);
    },
    openMenu(e) {
      this.visable = true;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeMenu() {
      this.visable = false;
    },
    closeOthers() {
      const i = this.routes.find(item => item.route === this.currentRoute);
      this.$store.commit('delRoute', { index: 0, count: 1000, item: i });
    },
    closeLeft() {
      const idx = this.routes.findIndex(item => item.route === this.currentRoute);
      this.$store.commit('delRoute', { index: 0, count: idx });
    },
    closeRight() {
      const idx = this.routes.findIndex(item => item.route === this.currentRoute);
      this.$store.commit('delRoute', { index: idx + 1, count: 1000 });
    },
  },
};
</script>>

<style scoped>
.tabs {
  padding-top: 3px;
}
.contextmenu {
  margin: 0;
  background: #ffffff;
  z-index: 2;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
</style>

<style>
.tabs .el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
.tabs .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0;
}
</style>
