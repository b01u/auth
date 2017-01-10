/**
 * @description application router file.
 * @author pkeros
 * @data 16/6/1
 * @email pkeros@vip.qq.com
 */

import AuthService from './services/AuthService'

export default (router) => {
  // let Auth = AuthService.getInstance()

  // 非法访问拦截
  // router.beforeEach(({ to, next }) => {
  //   // 拦截未登录访问
  //   if (to.path.indexOf('auth-required') !== -1) {
  //     // 拦截无权限访问 放开超级管理员的控制
  //     if (Auth.getLoginName() !== 'auth_admin' &&
  //       Auth.getMenu().indexOf(to.name) === -1) {
  //       console.warn('=== 页面无访问权限，禁止访问 ===')
  //
  //       return false
  //     }
  //     return Auth.isLoggedIn()
  //   } else {
  //     next()
  //   }
  // })

  // 路由映射
  router.map({

    /* 游乐场 */
    '/playground': {
      name: 'playground',
      cnName: '游乐场',
      component: resolve => {
        require(['./views/playground/index.vue'], res => {
          resolve(res)
        })
      }
    },

    /* 主页 */
    '/': {
      name: 'index',
      cnName: '主页',
      component: resolve => {
        require(['./views/index.vue'], res => {
          resolve(res)
        })
      },

      subRoutes: {

        /* 欢迎页面 */
        '/': {
          name: 'welcome',
          cnName: '欢迎页面',
          component: (resolve) => {
            require(['./views/other/welcome.vue'], resolve)
          }
        },

        /* 系统管理 */
        'auth-required/sys-man': {
          name: 'sys-man',
          cnName: '系统管理',
          component: (resolve) => {
            require(['./views/fun-man/sys-man.vue'], resolve)
          }
        },

        /* 角色管理 */
        'auth-required/role-man': {
          name: 'role-man',
          cnName: '角色管理',
          component: (resolve) => {
            require(['./views/auth-man/role-man.vue'], resolve)
          },

          subRoutes: {

            /* 角色管理默认页面 */
            '/:pager': {
              name: 'role-man-index',
              cnName: '角色管理',
              component: (resolve) => {
                require(['./views/auth-man/role-man-index.vue'], resolve)
              }
            },

            /* 角色权限配置 */
            '/user-man-config/:roleId/:roleName/:pager': {
              name: 'role-man-config',
              cnName: '角色权限配置',
              component: (resolve) => {
                require(['./views/auth-man/role-man-config.vue'], resolve)
              }
            }

          }

        },

        /* 权限管理 */
        'auth-required/auth-man/:moduleId/:moduleName': {
          name: 'auth-man',
          cnName: '权限管理',
          component: (resolve) => {
            require(['./views/auth-man/auth-man.vue'], resolve)
          }
        },

        /* 模块管理 */
        'auth-required/mod-man/:systemId/:systemName': {
          name: 'mod-man',
          cnName: '模块管理',
          component: (resolve) => {
            require(['./views/fun-man/module-man.vue'], resolve)
          }
        },

        /* 用户管理 */
        'auth-required/user-man': {
          name: 'user-man',
          cnName: '用户管理',
          component: resolve => {
            require(['./views/user-man/user-man.vue'], res => {
              resolve(res)
            })
          },

          subRoutes: {

            /* 用户管理默认页面 */
            '/:pager': {
              name: 'user-man-index',
              cnName: '用户管理',
              component: (resolve) => {
                require(['./views/user-man/user-man-index.vue'], resolve)
              }
            },

            /* 用户权限配置 */
            '/user-man-config/:userId/:userName/:pager': {
              name: 'user-man-config',
              cnName: '用户权限配置',
              component: (resolve) => {
                require(['./views/user-man/user-man-config.vue'], resolve)
              }
            },

            /* 用户角色配置 */
            '/user-man-role/:userId/:userName/:pager': {
              name: 'user-man-role',
              cnName: '用户权限配置',
              component: (resolve) => {
                require(['./views/user-man/user-man-role.vue'], resolve)
              }
            }

          }
        },

        /* 日志管理 */
        'auth-required/log-man': {
          name: 'log-man',
          cnName: '日志管理',
          component: (resolve) => {
            require(['./views/logs-man/log-man.vue'], resolve)
          }
        }

      }
    },

    /* 登录页面 */
    'login': {
      name: 'login',
      cnName: '登录页面',
      component: resolve => {
        require(['./views/other/login.vue'], res => {
          resolve(res)
        })
      }
    },

    /* 系统选择页面 */
    'auth-required/sys-list': {
      name: 'sys-list',
      cnName: '系统选择页面',
      component: resolve => {
        require(['./views/other/sys-list.vue'], res => {
          resolve(res)
        })
      }
    }

  })
}
