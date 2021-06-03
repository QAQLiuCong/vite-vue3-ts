// import { clearToken, getToken } from '@/tools/cookiesStorage.js'; // 导入vuex
import { ElLoading, ElMessage } from 'element-plus'
import { optionsType } from '../types'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
const CancelToken = axios.CancelToken
let loadningInstance: any = null
function showLoading() {
  loadningInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
  })
}
function hideLoading() {
  // 以服务的方式调用的 Loading 需要异步关闭
  setTimeout(() => {
    loadningInstance.close()
  }, 10)
}
const service = axios.create({
  baseURL: ''
})

service.interceptors.request.use(
  (config) => {
    // 请求头用于接口token 认证
    // getToken() && (config.headers['Authorization'] = getToken())
    showLoading()
    return config
  },
  (error: AxiosError) => {
    // 对请求错误的统一处理
    hideLoading()
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    //请求成功
    hideLoading()
    return res.data
  },
  (err: AxiosError) => {
    //请求失败
    hideLoading()
    ElMessage({
      message: err.message || '操作出错了',
      type: 'error'
    })
    return Promise.reject(err)
  }
)

export const request = async (_opt: { url: string; method: string; hideLoading: boolean }, params: any = {}) => {
  const defaultMethod: any = _opt?.method.toLocaleUpperCase() || 'GET'
  const opttions: optionsType = {
    url: _opt.url,
    method: defaultMethod,
    params: params,
    data: params,
    hideLoading: _opt.hideLoading || false,
    withCredentials: true
  }
  return await service(opttions)
}
