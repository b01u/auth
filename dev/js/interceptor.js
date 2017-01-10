/**
 * @description 请求拦截器.
 * @author pkeros
 * @data 16/6/2
 * @email pkeros@vip.qq.com
 */

import store from './vuex/store'
import { AJAX_TIMEOUT } from './global'
import { ApiConfig, ApiStatus } from './apis/api'
import * as types from './vuex/mutation-types'

import AuthService from './services/AuthService'

export default function install (Vue) {
  const Auth = AuthService.getInstance()

  Vue.http.options.timeout = AJAX_TIMEOUT
  Vue.http.options.root = ApiConfig.apiOrigin
  Vue.http.options.xhr = { withCredentials: Vue.config.debug }
  Vue.http.headers.common['DOMAIN'] = 'http://auth2.dev.kashuo.net'

  Vue.http.interceptors.push({
    request (requestBody) {
      let reqAuthPacket = AuthService.getAuthTokenPacket()

      store.dispatch(types.AJAX_REQUEST)

      // 清除 GET 请求中的空参数
      if (requestBody.method === 'GET') {
        let params = requestBody.params

        Object.keys(params).forEach((k) => {
          if (params[k] === '' || params[k] === null) delete params[k]
        })
      }

      // 添加请求令牌
      requestBody.headers['X-AUTH-TIME'] = reqAuthPacket.time
      requestBody.headers['X-AUTH-APPKEY'] = reqAuthPacket.appkey
      requestBody.headers['X-AUTH-TOKEN'] = reqAuthPacket.token
      // 添加用户令牌
      if (Auth.isLoggedIn()) {
        // 授权服务 实现方式
        requestBody.headers['X-USER-TOKEN'] = Auth.getUserToken()
      }

      return requestBody
    },
    response (responseBody) {
      store.dispatch(types.AJAX_RESPONSE)

      // 请求超时给出友好提示
      if (!responseBody.status) {
        responseBody.message = '请求超时! 请检查您的网络连接。'
      }
      // 状态 500 错误信息干预
      if (responseBody.data.code === '500') {
        responseBody.data.message = ApiStatus['500']
      }
      // 干预请求是否成功
      responseBody.ok = responseBody.data.code === ApiStatus.SUCCESS.code

      return responseBody
    }
  })
}
