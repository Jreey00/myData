import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = 基本url + 请求url
  // withCredentials: true, // 跨域请求时发送cookie
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token'] 是一个自定义的头部key
      // 根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 调试用
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果你想获取http信息，比如头部信息或状态信息
   * 请返回 response => response
  */

  /**
   * 通过自定义代码判断请求状态
   * 这里只是一个示例
   * 你也可以通过HTTP状态码判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是20000，则判断为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法token; 50012: 其他客户端已登录; 50014: Token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('您已注销，您可以取消停留在此页面，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // 调试用
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
