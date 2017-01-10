/**
 * @author: pkeros.
 * @date: 2016/6/28.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

import md5 from 'blueimp-md5'
import menus from '../data/menu'
import Cookie from '../utils/Cookie'

/**
 * @description 鉴权服务
 * @return {AuthService} 鉴权服务
 */
export default (() => {
  let _AuthService = Symbol('AuthService')      // AuthService
  let _sesStore = sessionStorage                // sessionStore

  let _appkey = 'cxcx2bles6w15xfehrbsb8vaeqwge75d7mybz8f0'
  let _secretkey = 'hsmpaf6wdryq8v5c7xsbtli7rjh45a75w9k6ejw9'

  class _ {
    /**
     * @description 构造函数
     * @param name 当前用户姓名
     * @param token 当前用户持有的令牌
     * @param menu 当前用户持有的菜单
     * @param loginName 当前用户的登录名
     */
    constructor ({
      name = '用户名',
      token = '',
      menu = [],
      loginName = 'root'
    }) {
      let authService = _sesStore.getItem('KAuthService')
      let cookieUserToken = Cookie.get('KSAuthUserToken')
      let cookieUserName = Cookie.get('KSAuthUserName')

      // first initialization authService to cookie.
      if (cookieUserToken) {
        this.name = cookieUserName
        this.token = cookieUserToken
        this.menu = menu
        this.loginName = loginName

        return
      }

      // 读取授权信息
      if (authService && !token.length) {
        ({ name, token, menu, loginName } = JSON.parse(authService))

        this.name = name
        this.token = token
        this.menu = menu
        this.loginName = loginName

        return
      }

      // 构造认证对象
      this.name = name
      this.token = token
      this.menu = menu
      this.loginName = loginName

      // 存储数据
      _sesStore.setItem('KAuthService', this)
    }

    /**
     * @description 判断是否登陆
     * @returns {Boolean}
     */
    get isLoggedIn () {
      // return Cookie.get('JSESSID') !== '' && Cookie.get('JSESSID') !== undefined
      return !!this.token
    }

    /**
     * @description toString 方法重载
     * @returns {String}
     */
    toString () {
      return JSON.stringify({
        name: this.name,
        token: this.token,
        menu: this.menu,
        loginName: this.loginName
      })
    }

    /**
     * @description 注销授权
     */
    destroy () {
      this.name = null
      this.token = null
      this.menu = null
      this.loginName = null

      _sesStore.removeItem('KAuthService')
    }
  }

  return class AuthService {
    /**
     * @description 获取
	   */
    static getInstance () {
      this[_AuthService] = new _(arguments[0] || {})

      return AuthService
    }

    /**
     * @description 获取请求鉴权
     * @return {Object} time: 时间戳 appkey: appkey token：请求令牌
     */
    static getAuthTokenPacket () {
      let _now = new Date().getTime()

      return {
        time: _now,
        appkey: _appkey,
        token: md5(_appkey + _now + _secretkey)
      }
    }

    /**
     * @description 获取 appkey
     * @returns {string} appkey
     */
    static getAppkey () {
      return _appkey
    }

    /**
     * @description 获取 secretkey
     * @returns {string} secretkey
     */
    static getSecretkey () {
      return _secretkey
    }

    /**
     * @description 令牌
     * @returns {String} 当前用户持有的令牌
     */
    static getUserToken () {
      return this[_AuthService].token
    }

    /**
     * @description 建立权限映射表到菜单的管理
     */
    static parseAuthMapper2Menu (authMapper) {
      let subMenus = []
      let authMenuMapper = []

      // 获取所有的子菜单
      menus.forEach(menu => { subMenus = subMenus.concat(menu.subMenu) })
      // 解析生成权限与菜单的映射
      subMenus.forEach(subMenu => {
        if (authMapper.indexOf(subMenu.ksa) !== -1) {
          authMenuMapper.push(subMenu.link)
        }
      })
      // 存储当前用户拥有的菜单
      this[_AuthService].menu = authMenuMapper
    }

    /**
     * @description 菜单
     * @returns {String} 当前用户持有的菜单
     */
    static getMenu () {
      return this[_AuthService].menu
    }

    /**
     * @description 登录名
     * @returns {String} 当前用户的登录名
     */
    static getLoginName () {
      return this[_AuthService].loginName
    }

    /**
     * @description 判断是否登陆
     * @returns {Boolean}
     */
    static isLoggedIn () {
      return this[_AuthService].isLoggedIn
    }

    /**
     * @description 获取用户昵称
     * @returns {String}
     */
    static getNickName () {
      return this[_AuthService].name
    }

    /**
     * @description 注销授权
     */
    static destroy () {
      this[_AuthService].destroy()
    }
  }
})()
