import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

// 设置请求拦截器
axios.interceptors.request.use(config => { // 向服务器发送请求需要发送config
  // 如果存在token，请求将会携带这个token（在登陆时会把token存入sessionStorage中）
  if (window.sessionStorage.getItem('tokenStr')) {
    config.headers.Authorization = window.sessionStorage.getItem('tokenStr')
  }
  return config
}, error => {
  console.dir(error)
})

// 设置响应拦截器(方便统一地处理错误信息)
axios.interceptors.response.use(success => {
  // 业务逻辑错误(success表示能连到接口)
  if (success.status && success.status === 200) {
    if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
      Message.error({ message: success.data.message })
      return
    }
    if (success.data.message) {
      Message.success({ message: success.data.message, duration: 5000 })
    }
  }
  // 返回一个json对象，以便可以进行后续处理
  return success.data
}, error => {
  // 连不上接口，根据不同状态码返回连不上接口的原因
  if (error.response.code === 504 || error.response.code === 404) {
    Message.error({ message: '服务器错误！' })
  } else if (error.response.code === 403) {
    Message.error({ message: '权限不足，请联系管理员！' })
  } else if (error.response.code === 401) {
    Message.error({ message: '请先登录！' })
    router.replace('/')
  } else {
    // 不满足以上所有情况，判断响应体中是否有信息，有信息就给打印出来
    if (error.response.data.message) {
      Message.error({ message: error.response.data.message })
    } else {
      Message.error({ message: '未知错误！' })
    }
  }
  return 'error'
})

const baseURL = '' // 前缀地址
// 封装post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseURL}${url}`,
    data: params
  })
}

// 封装put请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${baseURL}${url}`,
    data: params
  })
}

// 封装get请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${baseURL}${url}`,
    data: params
  })
}

// 封装delete请求
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${baseURL}${url}`,
    data: params
  })
}
