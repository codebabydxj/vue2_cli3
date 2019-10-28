/**
 * 前端请求接口动态域名处理
 * dev -> 开发环境
 * fat -> 测试环境
 * pro -> 生产环境
 */
// eslint-disable-next-line
let env = 'pro';
const { hostname } = window.location;
if (hostname.startsWith('dev')) {
  env = 'dev';
} else if (hostname.startsWith('fat')) {
  env = 'fat';
} else {
  env = 'pro';
}

export default env;
