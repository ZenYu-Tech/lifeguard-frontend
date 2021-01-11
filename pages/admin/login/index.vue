<template>
  <div class="admin-login" :style="{ 'background-image': `url(${require('@/assets/images/login.jpg')})` }">
    <div class="login-form">
      <div class="login-form__title">後台管理系統</div>
      <el-input v-model="user.userName" class="login-form__input">
        <template slot="prepend">帳號</template>
      </el-input>
      <el-input v-model="user.password" class="login-form__input">
        <template slot="prepend">密碼</template>
      </el-input>
      <div>
        <el-button type="primary" plain @click="submitForm">登入</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  layout: 'login',
  data() {
    return {
      user: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (this.user.userName === '') {
        this.$message.error('請輸入帳號')
        return
      }

      if (this.user.password === '') {
        this.$message.error('請輸入密碼')
        return
      }

      // const data = await this.$store.dispatch('user/login', this.user)

      // if (data.error) {
      //   this.$message(data.error)
      // } else {
      this.$router.push('/admin/articles')
      // }
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
