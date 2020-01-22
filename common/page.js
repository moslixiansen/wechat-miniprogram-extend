
import { apiGet, apiPost, request } from './apiManager/request'
import api from './apiManager/api'
import router from './navigation'

const originPage = Page

/**
 * 对微信原来的 Page 函数进行扩展
 */
Page = function (config = {}) {
  // 挂在 api 相关方法到 Page 的 this 上
  config.$api = api

  // 挂载封装的路由对象到 Page 的 this 上
  config.$router = router

  // 重写 Page 的 onLoad 函数, 主要为了还原上个页面传进来的参数
  let { onLoad } = config
  config.onLoad = function (options = {}) {
    onLoad && onLoad.call(this, router.extractParams(options))
  }

  return originPage(config)
}
