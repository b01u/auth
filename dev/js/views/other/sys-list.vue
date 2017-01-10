<template>
  <nav class="k-header">
    <div class="k-header__item logo-wrap">
      <img class="logo" src="../../assets/logo/header-logo.png" alt="LOGO">
    </div>
    <div class="k-header__item">
      <span class="k-header__title f16">权限系统</span>
    </div>
    <div id="menu-button" class="k-header__item k-header__menu r trans"
         :class="menuShow && 'active'" @click="menuShow = !menuShow">
      <div class="k-header__rcontainer">
        <span class="f14">您好, {{userName}}</span>
        <i class="icon-arrow-down22"></i>
      </div>
      <ul class="k-header__menu--active m0 p0" v-if="menuShow">
        <li @click="loginOut"><a><i class="icon-switch2"></i> 登出</a></li>
      </ul>
    </div>
  </nav>

  <div class="sys-list pt20 pb20">
    <ul class="sys-list-box">
      <li class="sys-list-auto"  v-for="sys in sysList">
        <a class="sys-title" :href="sys.url" v-text="sys.name">
          系统名称
        </a>
      </li>
    </ul>



    <div id="footer">
      © {{new Date().getFullYear()}} <a>卡说 · 活动管理平台</a>
      <a class="beian" href="http://www.miibeian.gov.cn" target="_blank">南昌网安备案第360101011060901号.</a>
      <span class="r"><a href="http://www.kashuo.com/" target="_blank">Power by Suzhou KASHUO Inc.</a></span>
    </div>
  </div>
</template>

<script lang="babel">
  import sysMan from '../../apis/models/sysMan'
  import AuthService from '../../services/AuthService'

  export default{
    data () {
      return {
        menuShow: false,
        userName: '用户名',
        sysList: []
      }
    },

    methods: {
      /**
       * @description 获取系统列表
       */
      getSysList () {
        sysMan.getSysList({ currentPage: 1, pageSize: 99 }).then(({ data }) => {
          this.sysList = data.data
        }, ({ data }) => this.errHandle(data))
      },

      /**
       * @description 登出系统
       */
      loginOut () {
        // 注销用户
        AuthService.destroy()
        KSAuthKit.destroy()

        // 跳转到登录页面
        this.$router.go({ name: 'login' })
      },

      /**
       * @description 异常处理
       * @param message 错误信息
       */
      errHandle ({ message }) {
        console.error(message)
      }
    },

    created () {
      // 获取角色列表
      this.getSysList()

      // 判断是否已经登陆过 登陆过跳转到系统管理页面
      !AuthService.isLoggedIn() && this.$router.go({ name: 'login' })

      // 获取用户昵称
      this.userName = AuthService.getNickName()
    }
  }
</script>
