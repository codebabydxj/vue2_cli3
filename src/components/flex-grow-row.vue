<template>
  <el-row class="flex-grow" type="flex" :justify="justify" :align="align" :gutter="gutter">
    <slot></slot>
  </el-row>
</template>

<script>
export default {
  props: {
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
    gutter: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
  .flex-grow {
    flex: 1 1 auto;
    padding: 20px;
    overflow: auto;
  }
</style>
