import { AxiosRequestConfig, AxiosPromise, AxiosRespose } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  // 根据params对url进行拼接处理
  config.url = transformUrl(config)
  // 头对象处理
  config.headers = transformHeader(config)
  // 对请求时传递的参数进行处理
  config.data = transformRequestData(config)
}

// 处理url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

// 处理data
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

// 处理headers
function transformHeader(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosRespose): AxiosRespose {
  res.data = transformResponse(res.data)
  return res
}

export default axios
