import axios from 'axios'

const config = {
  // baseURL: 'http://192.168.40.188:9999/service-system',
  timeout: 6000
}
const instance = axios.create(config)

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data && response.data.code === 0) { // 成功
    return response.data
  }
  return Promise.reject(response.data)
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default function (url, method, config = {}) {
  return instance({
    url,
    method,
    ...config
  })
}
