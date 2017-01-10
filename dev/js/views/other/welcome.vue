<template>
  <div class="welcome-container tc">
    <!--<img src="../../../static/assets/welcome.png" alt="welcome">-->
    <h4>您好{{nickName}}，欢迎进入权限管理系统！</h4>
  </div>
</template>

<script lang="babel">
  import AuthService from '../../services/AuthService'

  export default{
    data () {
      return {
        nickName: '用户名'
      }
    },

    created () {
      this.nickName = AuthService.getNickName()
    }
  }
</script>
