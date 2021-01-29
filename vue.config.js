// const fs = require('fs');

module.exports = {
  css: {
    sourceMap: false,
  },
  productionSourceMap: false,
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: { // 设置代理
    // https: {
    //   key: fs.readFileSync('./ssl/yogi.com.key'),
    //   cert: fs.readFileSync('./ssl/yogi.com.crt'),
    // },
    host: 'localhost', //ip地址
    port: 80, //端口
    open: true, //自动打开浏览器
    hot: true, //热加载
    public: 'localhost',
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.devtool = 'cheap-module-eval-source-map';
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
};
