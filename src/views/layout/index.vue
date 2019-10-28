<template>
  <div class="app">
    <content-interface>
      <el-button type="text" size="mini" @click="page(true)">page1</el-button>
      <router-view></router-view>
    </content-interface>
  </div>
</template>

<script>
import contentInterface from '@/components/content-interface';

export default {
  components: {
    contentInterface,
  },
  data() {
    return {

    };
  },
  methods: {
    page(bool) {
      if (bool) {
        this.$router.push({ path: '/page1-1' });
      } else {
        this.$router.push({ path: '/page2-1' });
      }
    },
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
</style>
