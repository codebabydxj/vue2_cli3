<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/* overall layout */
html, body {
  height: 100%;
  overflow-x: hidden;
}
/* iconfont style */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* 提示统一宽度 */
.el-tooltip__popper {
  max-width: 200px!important;
  word-break: break-all;
}
/* 隐藏的表格不需要border */
.el-table--border .is-hidden {
  border: 0!important;
}
.hover-csp:hover {
  cursor: pointer;
}
/* 下载字体 */
@font-face {
  font-family:  "Microsoft YaHei2";
  src: url( "/public/static/MicrosoftYaHei.ttf");
}

body,
#app {
  height: 100%;
  margin: 0;
}

body .el-button.el-button--text {
  user-select: text;
}

#app,
#app button,
#app input,
#app optgroup,
#app select,
#app textarea,
body .el-message,
body .el-popper,
body .el-popper .el-button,
body .el-tooltip__popper,
body .el-picker-panel,
body .el-message-box__wrapper,
body .el-dialog,
body .el-dialog .el-button,
body .el-dialog input {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Microsoft YaHei2","微软雅黑",Arial,sans-serif;
}
</style>
