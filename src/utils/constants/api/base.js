import env from '@/utils/config/env';

function getBaseUrl(envStr) {
  return {
    dev: '', // 本地开发环境
    fat: '', // 测试环境
    pro: '', // 生产环境
  }[envStr];
}

export const baseUrl = getBaseUrl(env);
// fromData 提交需要携带的参数
export const fromDataConfig = {
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
