<template>
  <div class="app">
    <menu-bar :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></menu-bar>
    <content-interface class="el_content" :isCollapse="isCollapse">
      <com-header>
        <tabs></tabs>
      </com-header>
      <router-view></router-view>
    </content-interface>
  </div>
</template>

<script>
import menuBar from '@/components/menu-bar';
import contentInterface from '@/components/content-interface';
import comHeader from '@/components/com-header/index';
import tabs from '@/components/tabs';

export default {
  components: {
    menuBar,
    contentInterface,
    comHeader,
    tabs,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    isCurCollapseChange(isCollapse) {
      this.isCollapse = isCollapse;
    },
  },
};
</script>

<style>
#app .app {
  display: flex;
  height: 100%;
}
/** com-header tabs style */
#app header .navbar-top .tabs-wrap .el-tabs__header {
  padding: 0 2px;
  margin-bottom: 0;
}
#app header .navbar-top .tabs-wrap .el-tabs__item.is-active {
  background-color: #ffffff;
}
/* 隐藏的表格 不需要border */
.el-table--border .is-hidden {
  border: 0 !important;
}
.el_content {
  height: 100%;
  overflow: auto;
}
</style>
<style lang="scss">
@import '@/assets/base-styles/element-variables.scss';
/** 全局基本样式 */
.input-width {
  width: 150px !important;
}
.date-picker-width {
  width: 230px !important;
}
</style>
