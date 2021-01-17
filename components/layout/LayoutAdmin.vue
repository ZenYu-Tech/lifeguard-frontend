<template>
  <div class="admin-layout">
    <div class="admin-main">
      <div class="admin-layout__header">
        <el-breadcrumb separator="-">
          <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="admin-layout__container">
        <Nuxt />
      </div>
    </div>
    <div class="admin-layout__sidebar">
      <div class="sidebar-logo">後台管理系統</div>
      <el-menu default-active="1" active-text-color="#0082FE">
        <el-menu-item v-for="item in menuItem" :key="item.id" :index="item.id" @click="handleRouteChange(item.path)">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItem: [
        { id: '1', name: '文章管理', path: 'articles' },
        { id: '2', name: '檔案管理', path: 'files' },
        { id: '3', name: '影片管理', path: 'videos' }
      ],
      breadcrumbList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    handleRouteChange(path) {
      this.$router.push(`/admin/${path}`)
    },
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      this.breadcrumbList = this.findCorrespondingChinese(matched[0].name)
    },
    findCorrespondingChinese(word) {
      const mainWord = word.split('-')[1]
      const secondWord = word.split('-')[2]

      const result = []
      switch (mainWord) {
        case 'articles':
          result.push('文章管理')
          break
        case 'videos':
          result.push('影片管理')
          break
        case 'files':
          result.push('檔案管理')
          break
      }

      if (secondWord) {
        switch (secondWord) {
          case 'create':
            result.push('新增')
            break
          case 'edit':
            result.push('編輯')
            break
        }
      } else {
        result.push('列表')
      }

      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-layout__sidebar {
  position: fixed;
  left: 0;
  top: 0;
  background: #ffffff;
  width: 240px;
  height: 100vh;
  box-shadow: 6px 0px 6px rgba(0, 0, 0, 0.1);
}

.admin-main {
  padding: 0 40px;
  margin-left: 240px;
  max-width: 1200px;
}

.admin-container {
  padding: 20px 30px;
  background: #ffffff;
  border-radius: 8px;
}

.admin-layout {
  height: 100vh;
  background: #f1f1f1;

  &__header {
    background: transparent;
    display: flex;
    align-items: center;
    height: 70px;

    .el-breadcrumb__item {
      font-weight: bold;
      font-size: 20px;
      color: #4a4a4a;
    }
  }
}

.sidebar-logo {
  font-size: 28px;
  font-weight: bold;
  color: #4a4a4a;
  text-align: center;
  padding: 20px 0;
}

.el-menu {
  border: none;
}

.el-menu-item {
  font-size: 18px;
  color: #6b6b6b;
  padding: 0 40px !important;
}
</style>
