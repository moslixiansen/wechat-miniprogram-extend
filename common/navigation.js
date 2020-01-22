import { TAB_BAR, AUTH_PAGE } from "./namespace"

/**
 * 统一跳转的参数为 params
 * @param {*} url
 * @param {*} params
 */
const formatUrl = function (url, params) {
  params = encodeURIComponent(JSON.stringify(params))
  url += `?params=${params}`

  return url
}

/**
 *  还原参数到 options, 并删除 options.params
 * @param {*} query
 */
const extractParams = function (query = {}) {
  const { params } = query
  let options = { ...query }

  if (params !== undefined) {
    options = {
      ...options,
      ...JSON.parse(decodeURIComponent(params)),
    }
    delete options.params
  }

  return options
}

/**
 * 可以在这里进行路由拦截, 在每个路由前要做的事情
 * @param {*} url
 * @param {*} params
 */
const beforeEach = function (url, params) {
  // 将 ../ 形式的 url 变成 /pages/   效果:  '../../coupon/coupon'  => '/pages/coupon/coupon'
  const index = url.lastIndexOf('../')
  if (index !== -1) {
    url = '/pages' + url.slice(index + 2)
  }

  const isTabBar = TAB_BAR.includes(url)

  // 如果 url 是 tabBar, 则用 switchTab
  if (isTabBar) {
    wx.switchTab({
      url,
      success: () => Promise.resolve(),
      fail: err => Promise.reject(err),
    })
    return null
  }

  const isBind = getApp().globalData.clientInfo
  const isAuthPage = AUTH_PAGE.includes(url)
  // 如果 未绑定会员信息 && 非tabBar页 && 非登录注册授权页
  // 则拦截跳转, 弹窗提示绑定会员
  if (!isBind && !isTabBar && !isAuthPage) {
    wx.showModal({
      title: '提示',
      content: '您还未绑定花果鲜会员哦，请先绑定花果鲜会员~',
      showCancel: true,
      cancelText: '随便看看',
      confirmText: '立即绑定',
      confirmColor: '#56BD6E',
      success(res) {
        res.confirm && reLaunch('/pages/autoBind/autoBind')
      }
    })
    // 拦截页面的跳转
    url = null
  }

  // 统一传参处理
  if (url && params) {
    url = formatUrl(url, params)
  }

  return url
}

const navigateTo = function (url, params, events = {}) {
  url = beforeEach(url, params)

  if (url) {
    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url,
        events,
        success: () => resolve(),
        fail: err => reject(err),
      })
    })
  }
}

const reLaunch = function (url, params) {
  url = beforeEach(url, params)

  if (url) {
    return new Promise((resolve, reject) => {
      wx.reLaunch({
        url,
        success: () => resolve(),
        fail: err => reject(err),
      })
    })
  }
}

const redirectTo = function (url, params) {
  url = beforeEach(url, params)

  if (url) {
    return new Promise((resolve, reject) => {
      wx.redirectTo({
        url,
        success: () => resolve(),
        fail: err => reject(err),
      })
    })
  }
}

const switchTab = function (url) {
  url = beforeEach(url)

  if (url) {
    return new Promise((resolve, reject) => {
      wx.switchTab({
        url,
        success: () => resolve(),
        fail: err => reject(err),
      })
    })
  }
}

const navigateBack = function (delta) {
  return new Promise((resolve, reject) => {
    wx.navigateBack({
      delta,
      success: () => resolve(),
      fail: err => reject(err),
    })
  })
}

export default {
  push: navigateTo,
  replace: redirectTo,
  back: navigateBack,
  reLaunch,
  switchTab,
  formatUrl,
  extractParams,
}
