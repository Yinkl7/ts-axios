import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/header'
import transform from './transform'

// 生成一个request
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  // 根据params对url进行拼接处理
  config.url = transformURL(config)
  // 通过config.transformRequest的函数对 headers和data进行处理
  config.data = transform(config.data, config.headers, config.transformRequest)

  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理url
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url!, params)
}

// 相应数据的处理
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
