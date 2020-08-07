// const fs = require('fs');

module.exports = {
  css: {
    sourceMap: false,
  },
  productionSourceMap: false,
  assetsDir: 'static',
  devServer: {
    // https: {
    //   key: fs.readFileSync('./ssl/yogi.com.key'),
    //   cert: fs.readFileSync('./ssl/yogi.com.crt'),
    // },
    host: 'localhost',
    port: 80,
    open: true,
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
