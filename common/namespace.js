/**
 * 整个小程序所用到的全局常量/跨模块常量 ( 比如 缓存的 key 等 ),
 * 都放到当前这个带命名空间的文件下。
 *    优点:
 *      1. 不同 page 读取同一信息, 可以统一更改, 方便维护
 *      2. 不会出现 key 覆盖的情况
 */

const global = 'app.' // 全局命名空间


const auth = global + 'auth.' // 登录授权命名空间

// 登录授权相关的全局常量
export const MINI_TOKEN = auth + 'mini_token'
export const MINI_OPT = auth + 'mini_opt'

// 四个 tab 页的路径, 如果上线有变动 tab 页需要修改此处
export const TAB_BAR_POINT_STORE = '/pages/pointStore/pointStore'
export const TAB_BAR_COUPON = '/pages/coupon/coupon'
export const TAB_BAR_STORE_PICK = '/pages/storePick/storePick'
export const TAB_BAR_PERSON_CENTER = '/pages/personCenter/personCenter'

// tabBar 数组
export const TAB_BAR = [
  TAB_BAR_POINT_STORE,
  TAB_BAR_COUPON,
  TAB_BAR_STORE_PICK,
  TAB_BAR_PERSON_CENTER,
]

// 登录、注册、授权页数组
export const AUTH_PAGE = [
  '/pages/auth/auth',
  '/pages/bind/bind',
  '/pages/autoBind/autoBind',
  '/pages/register/register',
]
