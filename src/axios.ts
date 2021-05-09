import { AxiosRequestConfig, AxiosInstance, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 让instance实现 AxiosInstance这个接口
  const instance = Axios.prototype.request.bind(context)
  // 将Axios上的方法添加到instance上
  extend(instance, context)
  // instance 是一个混合类型 可以调用instance(config) 也可以使用 instance.request()等继承的方法
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
