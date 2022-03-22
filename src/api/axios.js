// 二次封装axios发请求
import axios from 'axios'
import nprogress from 'nprogress';

const request = axios.create({
  baseURL: ''
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  nprogress.start()
  console.log('准备开始发请求')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('准备开始响应')
  nprogress.done()
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 对外暴露这个请求实例
export default request