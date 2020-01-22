import api from './apiManager/api'
import { MINI_TOKEN, MINI_OPT } from './namespace'

/**
 * 调用 wx.checkSession() 检查 session_key 状态
 */
function wxCheckSession () {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => resolve(), // session_key 未过期，并且在本生命周期一直有效
      fail: () => reject() // session_key 已经失效，需要重新执行登录流程
    })
  })
}

/**
 * 调用 wx.login() 获取 code
 */
function wxLogin () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        res.code ? resolve(res.code) : reject('微信登录失败！' + res.errMsg)
      },
      fail: err => reject('微信登录接口调用失败!' + JSON.stringify(err))
    })
  })
}

/**
 * 通过 code 换取维护过的 open_id 和 session_key
 * @param {Object} reqData
 */
function getOpenId (reqData) {
  return new Promise((resolve, reject) =>{
    api.getOpenId(reqData, false)
      .then(res => {
        const app = getApp()
        // 将 mini_token mini_opt 存到内存中
        app.globalData.auth.mini_token = res.data.secret_str
        app.globalData.auth.mini_opt = res.data.optstr
        // 将 mini_token mini_opt 存到 localStorage 中
        wx.setStorageSync(MINI_TOKEN, res.data.secret_str)
        wx.setStorageSync(MINI_OPT, res.data.optstr)
        resolve(res.data)
      })
      .catch(errMsg => {
        reject('请求出错:'+ errMsg)
      })
  })
}

/**
 * 刷新 session_key  保证是有效的
 */
function freshSessionKey () {
  return new Promise((resolve, reject) => {
    wxLogin()
      .then(code => {
        getOpenId({ code })
          .then(() => resolve())
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

/**
 * 检查 mini_token 和 min_opt 是否存在, 不存在则调用 getOpenId() 重新获取
 */
function checkAuth () {
  return new Promise ((resolve, reject) => {
    const app = getApp()
    // 先从内存中读取 mini_token mini_opt, 内存没有再从缓存读取
    const miniToken = app.globalData.auth.mini_token || wx.getStorageSync(MINI_TOKEN)
    const miniOpt = app.globalData.auth.mini_opt || wx.getStorageSync(MINI_OPT)

    if (!miniToken || !miniOpt) {
      // 如果没有 mini_token 或 min_opt, 就 wx.login 拿 code 去请求后台获取
      wxLogin()
        .then(code => {
          if (code) {
            getOpenId({ code })
              .then(() => resolve())
              .catch(err => reject(err))
          }
        })
        .catch(err => reject(err))
    } else {
      // 有则直接 resolve
      resolve()
    }
  })
}

export {
  wxCheckSession,
  wxLogin,
  getOpenId,
  freshSessionKey,
  checkAuth,
}
