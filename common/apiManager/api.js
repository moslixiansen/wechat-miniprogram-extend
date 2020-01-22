import { apiPost } from './request'

/**
 * 这个文件按功能管理业务 api, 有新功能时, 请新建一个对象,
 * 并在文件底部 export 出去
 */

/**
 * 登录、授权相关 api
 */
const auth = {

}

/**
 * 相关 api
 */
const pointExchange = {

}

/**
 * 相关 api
 */
const coupon = {

}

/**
 * 相关 api
 */
const pointOrder = {

}

/**
 * 相关 api
 */
const storePick = {

}


export default {
  ...storePick,
  ...pointOrder,
  ...coupon,
  ...pointExchange,
  ...auth,
}
