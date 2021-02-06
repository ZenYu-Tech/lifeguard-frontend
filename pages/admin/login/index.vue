<template>
  <div
    v-loading="loading"
    class="admin-login"
    :style="{ 'background-image': `url(${require('@/assets/images/login.jpg')})` }"
  >
    <div class="login-form">
      <div class="login-form__title">後台管理系統</div>
      <el-input v-model="account" class="login-form__input">
        <template slot="prepend">帳號</template>
      </el-input>
      <el-input v-model="password" show-password clearable class="login-form__input">
        <template slot="prepend">密碼</template>
      </el-input>
      <div>
        <el-button type="primary" plain @click="submitForm" :disabled="loading">登入</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  layout: 'login',
  data() {
    return {
      account: 'lifeguard2020',
      password: 'nsysulifeguard',
      loading: false
    }
  },
  methods: {
    ...mapActions('admin', {
      login: 'user/login'
    }),
    async submitForm() {
      if (this.account === '') {
        return this.$message({
          showClose: true,
          message: '請輸入帳號',
          type: 'error'
        })
      }

      if (this.password === '') {
        return this.$message({
          showClose: true,
          message: '請輸入密碼',
          type: 'error'
        })
      }

      try {
        this.loading = true
        await this.login({ account: this.account, password: this.password })
        this.$router.push('/admin/articles')
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-login {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 300px;
  text-align: center;

  &__title {
    color: #fff;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  &__input {
    margin-bottom: 30px;
  }
}
</style>
