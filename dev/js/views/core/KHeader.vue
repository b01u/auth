<template>
  <nav class="k-header">
    <div class="k-header__item logo-wrap">
      <img class="logo" src="../../assets/logo/header-logo.png" alt="LOGO">
    </div>
    <div class="k-header__item">
      <span class="k-header__title f16">权限系统</span>
    </div>
    <div id="menu-button" class="k-header__item k-header__menu r trans"
         v-click-outside="headerMenuOutsideClickHandle"
         :class="headerMenu.show && 'active'"
         @click="headerMenu.show  = !headerMenu.show "
    >
      <div class="k-header__rcontainer">
        <span class="f14">您好, {{nickName}}</span>
        <i class="icon-arrow-down22"></i>
      </div>
      <ul class="k-header__menu--active m0 p0"
          v-if="headerMenu.show "
      >
        <li @click="logout"><a><i class="icon-switch2"></i> 登出</a></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="babel">
  import AuthService from '../../services/AuthService'

  export default {
    data () {
      return {
        nickName: '用户名',
        headerMenu: {
          show: false
        }
      }
    },
    methods: {
      /**
       * @description 点击头部菜单之外的处理函数
       */
      headerMenuOutsideClickHandle () { this.headerMenu.show = false },

      /**
       * @description 登出处理函数
       */
      logout () {
        // 注销用户
        AuthService.destroy()
        KSAuthKit.destroy()

        // 跳转到登录页面
        this.$router.go({ name: 'login' })
      }
    },
    created () {
      // 获取用户昵称
      this.nickName = AuthService.getNickName()

      // 开启权限管理
      /* global KSAuthKit */
      KSAuthKit.config({
        systemId: 8,
        userToken: this.$cookie.get('KSAuthUserToken'),
        apiURL: this.$cookie.get('KSAuthApiURL')
      })
      KSAuthKit.ready(() => {
        console.log(arguments)
      })
//      KSAuthKit.on()
    }
  }
</script>
