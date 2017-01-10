/**
 * @author: pkeros.
 * @date: 2016/6/21.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

export default [
  {
    name: '功能管理',
    ksa: 'general_master',
    subMenu: [
      {name: '系统管理', icon: 'icon-icohome', link: 'sys-man', ksa: 'system'},
      {name: '模块管理', icon: 'icon-icostar', link: 'mod-man', ksa: 'module'}
    ]
  },
  {
    name: '权限管理',
    ksa: 'function_master',
    subMenu: [
      {name: '权限管理', icon: 'icon-quanxiancaozuoico', link: 'auth-man', ksa: 'permission'},
      {name: '角色管理', icon: 'icon-rentouliangrenhover', link: 'role-man-index', ksa: 'role'}
    ]
  },
  {
    name: '用户管理',
    ksa: 'user_master',
    subMenu: [
      {name: '用户管理', icon: 'icon-yonghu', link: 'user-man-index', ksa: 'user'}
    ]
  },
  {
    name: '日志管理',
    ksa: 'log_master',
    subMenu: [
      {name: '日志查询', icon: 'icon-buzoupen', link: 'log-man', ksa: 'log'}
    ]
  }
]
