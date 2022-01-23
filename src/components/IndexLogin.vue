<template>
    <div class="index-login">
        <el-button type="text" @click="openLoginDialog()">登录</el-button>
        <el-dialog title="登录" :visible.sync="dialogFormVisible">
              <el-form :model="form" ref="indexloginForm" class="login-form" style="padding:12px 24px 36px">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                  <el-input autocomplete="off" v-model="form.account" placeholder="用户名或邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                  <el-input autocomplete="off" v-model="form.password" placeholder="密码" show-password></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="registeAccount()" :loading="isLoading">登 录</el-button>
                <el-button @click="clearDialog()">取 消</el-button>
              </div>
        </el-dialog>
        <el-button type="text" @click="openRegisterPage()">注册</el-button>
    </div>
</template>

<script>
import { postRequest } from '../utils/api.js'
export default {
  name: 'IndexLogin',
  // watch: function () {
  //   this.disabled = this.$store.state.loginFormDisabled
  // },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        password: '',
        account: ''
      },
      disabled: false,
      formLabelWidth: '50px',
      isLoading: false
    }
  },
  methods: {
    openLoginDialog () {
      this.dialogFormVisible = true
    },
    openRegisterPage () {
      this.$router.push('/regist')
    },
    registeAccount () {
      this.isLoading = true
      const formData = new FormData()
      formData.append('username', this.form.account)
      formData.append('password', this.form.password)
      postRequest('/login', formData).then(resp => {
        if (resp.status === 'success') {
          // 向Vuex中存储用户的username
          this.$store.commit('setUserName', formData.get('username'))
          this.$store.commit('setLoginState', true)
          window.sessionStorage.setItem('store', JSON.stringify(this.$store.state))
          setTimeout(() => {
            this.isLoading = false
            this.$router.go(0)
            this.dialogFormVisible = false
          }, 300)
          this.$message({
            message: '登录成功!',
            type: 'success',
            duration: 1200
          })
        } else {
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .index-login {
      .el-button--text {
        margin-right: 20px;
        font-size: 18px;
        color: #333;
      }
    }
</style>
