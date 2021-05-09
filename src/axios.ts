import { AxiosRequestConfig, AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 让instance实现 AxiosInstance这个接口
  const instance = Axios.prototype.request.bind(context)
  // 将Axios上的方法添加到instance上
  extend(instance, context)
  // instance 是一个混合类型 可以调用instance(config) 也可以使用 instance.request()等继承的方法
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
