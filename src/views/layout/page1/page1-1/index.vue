<template>
  <div style="width: calc(100%)">page1页面
    <el-table stripe border size="mini" v-auto-height:tableHeight="-50" :max-height="tableHeight">
      <el-table-column prop="" align="center" label="金色"></el-table-column>
      <el-table-column prop="" align="center" label="紫色"></el-table-column>
      <el-table-column prop="" align="center" label="黑色"></el-table-column>
      <el-table-column prop="" align="center" label="白色"></el-table-column>
      <el-table-column prop="" align="center" label="黄色"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: -50,
    };
  },
};
</script>

<style>

</style>
