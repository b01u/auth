<template>
  <div class="login">
    <div class="login__background">
      <loading></loading>
      <div class="login__form form-hor">
        <img class="base-conlogo" src="../../assets/logo/login-logo.png" >
        <div class="base-conname">卡说大后台</div>
        <validator name="login">
          <div class="kinput kinput-container">
            <div class="input-wrap input-xl">
              <input class="input" type="text" placeholder="请输入用户名" maxlength="32"
                     v-model="loginForm.userName" @keyup.enter="doLogin"
                     @change="errHandle.show = false"
                     v-validate:userName="['required']"
              >
              <div class="kinput__icon" ><i class="icon"></i></div>
            </div>
          </div>
          <div class="kinput kinput-container">
            <div class="input-wrap input-xl">
              <input class="input" type="password" placeholder="请输入密码" maxlength="32"
                     v-model="loginForm.password" @keyup.enter="doLogin"
                     @change="errHandle.show = false"
                     v-validate:password="['required']"
              >
              <div class="kinput__icon" ><i class="icon"></i></div>
            </div>
          </div>
          <div class="login__err-notification kinput-container">
            <span class="msg" v-text="errHandle.msg"></span>
          </div>
          <div class="form-control">
            <k-button type="primary" size="xl" @kclick="doLogin" :disable="$login.invalid">登录</k-button>
          </div>
        </validator>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
  import KButton from '../../components/KButton.vue'
  import Loading from '../../components/LoadingMask.vue'

  import Login from '../../apis/models/login'
  import AuthService from '../../services/AuthService'

  export default{
    data () {
      return {
        urlFrom: null,

        errHandle: {
          show: false,
          msg: ''
        },

        loginForm: {
          userName: '',
          password: '',
          sysId: null
        }
      }
    },
    methods: {
      /**
       * @description 登录动作
       */
      doLogin () {
        // 验证用户名和密码是否都填写了
        if (this.$login.invalid) { return }

        // 发起登录请求
        Login.login(this.loginForm).then(({ data }) => {
          let tag = { expires: 1, domain: '.kashuo.net' }
          let { user_token, api_url, name } = data.data

          this.$cookie.set('KSAuthUserToken', user_token, tag)
          this.$cookie.set('KSAuthApiURL', api_url, tag)
          this.$cookie.set('KSAuthUserName', name, tag)

          // 创建 AuthServices
          AuthService.getInstance({
            name: name,
            token: user_token,
            loginName: this.loginForm.userName
          })

          if (this.urlFrom) {
            // 跳转到 from 指定地址
            window.location.href = this.urlFrom
          } else {
            // 跳转到 welcome 页面
            this.$router.go({ name: 'sys-list' })
          }
        }, ({ data }) => {
          this.errHandle.show = true
          this.errHandle.msg = data.message
        })
      }
    },
    created () {
      // 判断是否已经登陆过 登陆过跳转到系统管理页面
      AuthService.isLoggedIn() && this.$router.go({ name: 'sys-list' })
      // 获取 URL 上的 From 参数
      this.urlFrom = this.$utils.getQueryString('from')
    },
    components: { KButton, Loading }
  }
</script>
