<template>
  <div class="app">
    <menu-bar :isCollapse="isCollapse"></menu-bar>
    <content-interface class="el_content" :isCollapse="isCollapse">
      <com-header>

      </com-header>
      <router-view></router-view>
    </content-interface>
  </div>
</template>

<script>
import menuBar from '@/components/menu-bar';
import contentInterface from '@/components/content-interface';
import comHeader from '@/components/com-header';

export default {
  components: {
    menuBar,
    contentInterface,
    comHeader,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {

  },
};
</script>

<style scoped>
  #app .app {
    display: flex;
    height: 100%;
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
