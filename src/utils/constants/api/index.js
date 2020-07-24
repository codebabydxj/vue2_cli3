/**
 * 所有API接口统一从此处对外暴露，防止各个模块js文件合并代码发生不必要的冲突
 * 引入方式：import * API from '@/utils/constants/api'
 * 调用：API.login
 */

export * from './base'; // API基础服务
export * from './auth';
