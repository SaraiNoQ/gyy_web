<template>
    <div class="user-logout">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <div>{{ $store.state.userName }}</div>
              <div><img src="../assets/userInfo.jpg"></div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userRegister">
                注册
              </el-dropdown-item>
              <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="userLogout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
</template>

<script>
export default {
  name: 'UserInfo',
  methods: {
    handleCommand (command) {
      if (command === 'userRegister') {
        this.$router.push('/regist')
      }
      if (command === 'userLogout') {
        this.$router.replace('/')
        this.$router.go(0)
        this.$store.commit('setLoginState', false)
        this.$store.commit('setUserName', '')
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        // console.log(window.sessionStorage.getItem('store').charAt(window.sessionStorage.getItem('store').search('loginState') + 12) === 'f')
      }
    }
  }
}
</script>

<style lang="scss">
.user-logout {
      margin-right: 5px;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: black;
        font-size: 20px;
        &:hover {
          cursor: pointer;
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 24px;
        }
        div {
          margin-right: 10px;;
        }
      }
    }
</style>
