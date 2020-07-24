<template>
  <el-dialog
    class="notice-dialog"
    width="800px"
    :close-on-click-modal="false"
    :visible="isShow"
    :before-close="cancel">
    <el-row>
      <div class="title">{{ noticeObj.title }}</div>
      <div class="content" v-html="noticeObj.content"></div>
      <div class="time">
        <el-divider content-position="left" v-html="noticeObj.content">{{ noticeObj.time }}</el-divider>
      </div>
    </el-row>
    <div align="center" slot="footer">
      <el-button type="primary" size="mini" @click.stop="comfire">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['isShowMessage', 'noticeObj'],
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    this.isShow = this.isShowMessage;
  },
  methods: {
    comfire() {
      this.$emit('messageCb');
    },
    cancel() {
      this.$emit('messageCb');
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-dialog {
  .title {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #262626;
    padding: 0 20px;
  }
  .content {
    margin: 10px 0;
    max-height: 480px;
    word-wrap: break-word;
    word-break: break-all;
    overflow-y: auto;
    color: #262626;
    line-height: 24px;
  }
  .el-divider__text{
    color: #878d99;
    cursor: default;
  }
}
</style>
