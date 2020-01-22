import Config from '../../config/config'
import { showToast } from '../../utils/util'
import { MINI_TOKEN, MINI_OPT } from '../../common/namespace'

const apiGet = function (url, data = {}, ext = {}) {
  return request({
    url,
    method: 'GET',
    data,
    ext
  })
}

const apiPost = function (url, data = {}, ext = {}) {
  return request({
    url,
    method: 'POST',
    data,
    ext
  })
}

const request = function ({ url = '', method = 'POST', data = {}, ext = {} }) {
  // 基础数据处理
  data = data || {}
  url = Config.baseUrlApi + url
  // Loading 处理
  ext.isLoading = ext.isLoading === undefined ? true : ext.isLoading // 默认显示 loading
  ext.isLoading && wx.showLoading({ mask: true, title: ext.loadingTitle || '' })
  // 设置请求头信息
  const app = getApp()
  const header = {
    'content-type': 'application/json', // api BaseController 记录日志时的版本号
    'platform': `LANA-${Config.version}`,
    'mini-sdk-version': wx.getSystemInfoSync().SDKVersion,
    'mini-token': app.globalData.auth.mini_token || wx.getStorageSync(MINI_TOKEN) || '',
    'mini-opt': app.globalData.auth.mini_opt || wx.getStorageSync(MINI_OPT) || '',
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success (res) {
        if (res.statusCode === 200) {
          if (res.data.result) {
            // 请求成功, 接口返回 true
            ext.successMsg && showToast(ext.successMsg, 'success')
            resolve(res.data)
          } else {
            // 请求成功, 接口返回 false
            console.log(`debug request.js apiError, request url = ${url} `, res.data)
            reject(res.data.msg)
          }
        } else {
          // http 出错, 比如 状态码 404, 400, 500, 502 等
          console.log(`debug request.js httpError, request url = ${url} `, res)
          ext.httpErrorMsg && showToast(ext.httpErrorMsg)
          reject(res.data.message)
        }
      },
      fail (err) {
        // 调用 wx.request() 失败, 原因一般是用户断网了
        console.log(`debug request.js wx.request() call fail, request url = ${url} `, err)
        showToast('网络连接不可用，请检查网络设置。')
        reject(err)
      },
      complete () {
        // 隐藏 loading
        ext.isLoading && wx.hideLoading()
      }
    })
  })
}

export {
  apiGet,
  apiPost,
  request,
}
