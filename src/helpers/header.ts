import { isPlainObject } from './util'

// 把content-type转化成Content-Type
function normalizeHeaderName(headers: any, normalizeName: string) {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 请求头处理
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // if (headers) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeader(headers: string): any {
  let parsed = Object.create(null)

  // header为空时
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...values] = line.split(':')
    key = key.trim().toLowerCase()
    // key为空时跳到下一次循环
    if (!key) {
      return
    }
    const value = values.join(':').trim()
    parsed[key] = value
  })

  return parsed
}
