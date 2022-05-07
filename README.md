# vue-cli3 （@vue/cli脚手架）

- node.js (8.9.0以上) ---->(可升级npm：npm install -g npm)  ---->(可修改为淘宝镜像：npm config set registry "https://registry.npm.taobao.org")

- npm install -g @vue/cli

- vue create project-name (使用@vue/cli)

- 选择手动配置

- 全局配置可查看 （https://blog.csdn.net/qq_36517520/article/details/92441854）

- 剩余就是自己配置一个依赖包， 根目录配置/gitignore/es-lint/babel/browsers/vue.config

- node-sass模块无法成功下载，并非python的版本问题，国内网络原因导致被墙，通过淘宝镜像下载node-sass模块（npm i --save-dev node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/） 或者根目录下定义.npmrc文件设置node-sass下载方式

- 主要node - npm - sass-loader - node-sass 版本关联，否则会启动报错 

- 可以开始大展身手了

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### 代码规范

- js代码规范：[airbnb/javascript](https://github.com/airbnb/javascript)([中文版]-https://github.com/yuche/javascript)

-html/css代码规范：[mdo/code-guide](https://codeguide.co/)([中文版]-https://codeguide.bootcss.com/)

-文件命名规范：使用英文命名文件夹以及文件（不可使用中文！）,命名方式为kebab-case的形式（小写字母，单词以中划线连接，如：get-user-info）

### 接口规范

- http request(请求)

  1. 请求头设置
    `Content-Type:application/json;charset=UTF-8`(请求体数据为json字符串)
    `Content-Type:application/x-www-form-urlencoded;charset=UTF-8`(请求体数据为表单formData)
    `Content-Type:multipart/form-data;charset=UTF-8`(文件上传)
  2. 请求体内键名统一使用驼峰命名

- http response(响应)

  1. 响应头设置`Content-Type:application/json`,使响应数据位JSON字符串
  2. 响应体包含三部分：code、result、msg，功能如下

    |参数名称|类型|描述|
    |---|---|---|
    |code|integer|响应码，用于判断状态|
    |result|JSON对象|请求成功时需要返回的数据信息|
    |msg|string|请求出错时的错误信息|

    成功或错误时返回结果如下：

    ```json
    {
      "code": 200,
      "result": {},
      "msg": null,
    }
    ```

    ```json
    {
      "code": 401,
      "result": null,
      "msg": "用户未登录",
    }
    ```


### 代码注释说明

- 组件里面注释一般使用单行注释//,关键的方法和作用要注释说明一下

  ```js
  setUserInfo() {
    // 保存用户信息
  }
  ```

- 依赖js和包管理一般采用多行js，封装时写明如何使用

- 注释大于代码，越详细越好


### 项目使用第三方框架/库

- 项目基本框架@vue

- 前端路由框架@vue-router

- 状态管理器@vuex

- css初始化与浏览器一致性库@normalize.css

- ajax请求@axios

- 事件对象操作库@moment

- 图标库@font-awesome


### git开发流程

- origin/feature/***：新功能开发特性分支

- origin/develop：本地发布分支

- origin/alpha：测试发布分支

- origin/release：产品验收分支

- origin/base：基于master的分支，保护master分支正确性，上生产前过滤错误

- origin/master：部署生产分支


### 代码提交流程

>  origin/feature/***  ->  develop

>  origin/feature/***  ->  alpha

>  origin/feature/***  ->  release

>  origin/feature/***  ->  base

> base -> master


### 参考资料

- [vue文档](https://vuejs.org/)

- [vue-router文档](https://router.vuejs.org/)

- [vuex文档](https://vuex.vuejs.org/)

- [element文档](https://element.eleme.io/#/zh-CN)

- [MDN文档](https://developer.mozilla.org/zh-CN/)

- [vue技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
