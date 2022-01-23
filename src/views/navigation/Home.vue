<template>
  <div>
    <el-container>
      <el-header style="height: 109px;">
        <div class="logo-heading">
          <img src="../../assets/bzylogo.png">
          <h1>古籍药典阅读对照系统</h1>
        </div>
        <div>
          <user-info v-if="!this.loginButton"></user-info>
          <index-login v-else key="index-login"></index-login>
        </div>
      </el-header>
      <div class="content">
      <el-aside width="200px">
        <aside-menu></aside-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from '../../components/AsideMenu'
import UserInfo from '../../components/UserInfo'
import IndexLogin from '../../components/IndexLogin.vue'
import Register from '../../components/Register'
export default {
  name: 'Home',
  // eslint-disable-next-line vue/no-unused-components
  components: { AsideMenu, UserInfo, Register, IndexLogin },
  mounted: function () {
    // console.log(this.loginButton)
    this.loginButton = window.sessionStorage.getItem('store') === null || window.sessionStorage.getItem('store').charAt(window.sessionStorage.getItem('store').search('loginState') + 12) === 'f'
  },
  data () {
    return {
      loginButton: true
    }
  }
}
</script>

<style lang="scss">
  .el-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: url('../../assets/header.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    color: #333;
    .logo-heading {
        display: flex;
        align-items: center;
        h1 {
            display: inline-block;
            padding-left: 10px;
        }
    }
  }

  .content {
      .el-aside {
          float: left;
      }
      .el-main {
          float: right;
      }
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    width: calc(100% - 200px);
    height: calc(100vh - 109px);
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
