import { type } from 'os'

// 项目下类型的公共文件
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// axios配置信息类型定义
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // 相应类型定义
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 服务端返回数据类型定义
export interface AxiosRespose {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// Promise<T> T是什么类型 resolve函数的参数就是什么类型
export interface AxiosPromise extends Promise<AxiosRespose> {}
