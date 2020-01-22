import { apiPost } from './request'

/**
 * 这个文件按功能管理业务 api, 有新功能时, 请新建一个对象,
 * 并在文件底部 export 出去
 */

/**
 * 登录、授权相关 api
 */
const auth = {
  // 用户授权
  auth (reqData) {
    return apiPost('MiniProgram/update-info', reqData)
  },
  // 获取用户信息 //todo
  getUserInfo () {
    return apiPost('MiniProgram/get-mini-user', {})
  },
  // 获取手机短信验证码
  getMessageCode (reqData) {
    return apiPost('MiniProgram/create-code', reqData)
  },
  // 修改密码
  changePassword (reqData) {
    return apiPost('MiniProgram/check-code-change-psd', reqData)
  },
  // 注册新会员
  register (reqData) {
    return apiPost('MiniProgram/client-register', reqData)
  },
  // 通过 wx.login 的 code 获取 open_id 和 session_key 信息
  getOpenId (reqData, isLoading) {
    return apiPost('MiniProgram/get-open-id', reqData, { isLoading })
  },
  // 获取用户的 union_id
  getUnionId (reqData) {
    return apiPost('MiniProgram/get-union-id', reqData)
  },
  // 解密用户信息数据
  decryptData (reqData) {
    return apiPost('MiniProgram/decrypt-data', reqData)
  },
  // 用户微信绑定花果鲜会员
  bindUser (reqData) {
    return apiPost('MiniProgram/bind-user', reqData)
  },
}

/**
 * 积分兑换相关 api
 */
const pointExchange = {
  // 获取会员的最后一次消费门店或开卡门店
  PointMallGetStoreBorn (reqData) {
    return apiPost('MiniProgram/point-mall-get-store-born', reqData)
  },
  // 积分兑换页 - 获取页面的头部背景、积分轻松得以及精选积分兑换的内容
  getHomePage (reqData) {
    return apiPost('MiniProgram/get-home-page', reqData)
  },
  // 积分兑换页 - 获取精选积分兑换区的商品信息
  getHomePageRecommend (reqData) {
    return apiPost('MiniProgram/get-home-page-recommend', reqData)
  },
  // 积分抽大奖页 - 获取抽奖规则及奖品信息
  getLotteryInfo (reqData) {
    return apiPost('MiniProgram/get-lottery-info', reqData, { isLoading: false })
  },
  // 积分抽大奖页 - 获取抽奖结果
  getLotteryResult (reqData) {
    return apiPost('MiniProgram/get-lottery-result', reqData, { isLoading: false })
  },
  // 积分抽大奖页 - 获取中奖名单
  getWinnerList (reqData) {
    return apiPost('MiniProgram/get-winner-list', reqData)
  },
  // 获取商品列表
  getPointProduct (reqData) {
    return apiPost('MiniProgram/get-point-product', reqData);
  },
  // 获取商品详情
  getPointProductDetail (reqData) {
    return apiPost('MiniProgram/get-point-product-detail', reqData);
  },
  // 获取粉丝关联会员喜爱的门店列表
  getClientEnjoyStoreList (reqData) {
    return apiPost('MiniProgram/get-client-enjoy-store-list', reqData);
  },
  // 获取门店订单详情
  getClientRetailOrderDetail (reqData) {
    return apiPost('MiniProgram/wx-get-retail-order-line', reqData);
  },
  // 获取开票详情
  getInvoiceDetail (reqData) {
    return apiPost('MiniProgram/get-invoice-detail', reqData);
  },
  // 根据 定位经纬度|id倒序排序 获取门店列表
  getStoreByPosition (reqData) {
    return apiPost('MiniProgram/get-store-by-position', reqData, { isLoading: false })
  },
  // 查询门店
  getStoreBySearch (reqData) {
    return apiPost('MiniProgram/search-store', reqData, { isLoading: false })
  },
  // 获取积分兑换页顶部模板
  getPointStoreTopTemplate(reqData) {
    return apiPost('MiniProgram/get-point-store-top-template', reqData, { isLoading: false })
  },
  // 获取积分兑换页中间模板
  getPointStoreCenterTemplate(reqData) {
    return apiPost('MiniProgram/get-point-store-center-template', reqData, { isLoading: false })
  },
  // 获取积分兑换页推荐商品
  getPointStoreRecommendProduct(reqData) {
    return apiPost('MiniProgram/get-point-store-recommend', reqData)
  },
}

/**
 * 优惠券相关 api
 */
const coupon = {
  // 优惠券页 - 获取可领取优惠券列表
  getCouponList(reqData) {
    return apiPost('MiniProgram/get-coupon-list', reqData)
  },
  // 优惠券页 - 根据传参获取优惠券列表
  getClientCouponList (reqData) {
    return apiPost('MiniProgram/get-client-coupon-list', reqData)
  },
  // 优惠券页 - 立即领取
  receiveCoupon(reqData) {
    return apiPost('MiniProgram/mini-rob-coupon', reqData)
  },
  // 优惠券页 - 立即使用 v2
  getCouponDetail(reqData) {
    return apiPost('MiniProgram/get-client-coupon-detail', reqData)
  },
  // 优惠券页 - 立即使用 v2
  uploadShareCouponImg(reqData, isLoading) {
    return apiPost('MiniProgram/upload-share-coupon-img', reqData, { isLoading })
  },
}

/**
 * 积分兑换单相关 api
 */
const pointOrder = {
  // 1、提交积分兑换单
  submitPointOrder (reqData) {
    return apiPost('MiniProgram/submit-point-order', reqData, { loadingTitle: '提交兑换中...' })
  },
  // todo 暂时没有调用
  // 2、获取微信预付单
  getPointOrderCharge (reqData) {
    return apiPost('MiniProgram/get-point-order-charge', reqData)
  },
  // 3、查询兑换单状态
  getPointOrderStatus (reqData) {
    return apiPost('MiniProgram/get-point-order-status', reqData)
  },
  // todo 暂时没有调用
  // 4、转化已支付后的兑换单（优惠券->发放明细，实物->加入配送单）
  transformPointOrder (reqData) {
    return apiPost('MiniProgram/transform-point-order', reqData)
  },
  // 获取我的兑换列表
  getOrderList (reqData) {
    return apiPost('MiniProgram/get-client-order-list', reqData)
  },
  // 获取我的兑换详情
  getPointOrderDetail (reqData) {
    return apiPost('MiniProgram/get-point-order-detail', reqData)
  },
  // 获取我的兑换明细详情
  getPointOrderLineDetail (reqData) {
    return apiPost('MiniProgram/get-point-order-line-detail', reqData)
  },
}

/**
 * 门店自提相关 api
 */
const storePick = {
  // 获取门店自提商品
  getStorePickProduct(reqData) {
    return apiPost('MiniProgram/get-store-pick-product', reqData)
  },
}

/**
 * 我的相关 api
 */
const me = {
  // 获取积分流水log
  getCreditLog (reqData) {
    return apiPost('MiniProgram/wx-get-client-point-change', reqData)
  },
  // 切换绑定
  RelieveBind (reqData) {
    return apiPost('MiniProgram/relieve-bind', reqData, { isLoading: false })
  },
  // 获取余额流水log
  geBalanceLog (reqData) {
    return apiPost('MiniProgram/get-account-change', reqData)
  },
  // 获取个人中心数据
  getPersonCenter (reqData) {
    return apiPost('MiniProgram/get-user-info', reqData)
  },
  // 获取拼团数据  // isShow false
  getUrlData (reqData) {
    return apiPost('MiniProgram/get-url-data', reqData)
  },
  // 获取会员零售单
  getClientRetailOrder (reqData) {
    return apiPost('MiniProgram/wx-get-retail-order', reqData)
  },
  // 获取会员开票流水
  getClientInvoice (reqData) {
    return apiPost('MiniProgram/get-invoice-list', reqData)
  },
  // 获取会员开票流水
  getClientInfo (reqData = {}, isLoading) {
    return apiPost('MiniProgram/ck-bind-record', reqData, { isLoading })
  },

}


export default {
  ...me,
  ...storePick,
  ...pointOrder,
  ...coupon,
  ...pointExchange,
  ...auth,
}
