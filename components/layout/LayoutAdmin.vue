<template>
  <div class="admin-layout">
    <div class="admin-layout__header">
      <el-breadcrumb separator="-">
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="admin-layout__sidebar">
      <div class="sidebar-logo">後台管理系統</div>
      <el-menu
        default-active="1"
        active-text-color="#0082FE"
      >
        <el-menu-item v-for="item in menuItem" :key="item.id" :index="item.id" @click="handleRouteChange(item.path)">
          <span>{{item.name}}</span>
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
        { id: 1, name: '文章管理', path: 'article' },
        { id: 2, name: '檔案管理', path: 'file' },
        { id: 3, name: '影片管理', path: 'vedio' },
      ]
    }
  },
  methods: {
    handleRouteChange(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-layout__sidebar {
  position: fixed;
  left: 0;
  top: 0;
  background: #FFFFFF;
  width: 240px;
  height: 100vh;
  box-shadow: 6px 0px 6px rgba(0, 0, 0, 0.1);

}

.admin-layout {
  height: 100vh;
  background: #F1F1F1;

  &__header {
    background: transparent;
    display: flex;
    align-items: center;
    height: 70px;
    padding-left: 40px;
    margin-left: 240px;

    .el-breadcrumb__item {
      font-weight: bold;
      font-size: 20px;
      color: #4A4A4A;
    }
  }
}

.sidebar-logo {
  font-size: 28px;
  font-weight: bold;
  color: #4A4A4A;
  text-align: center;
  padding: 20px 0;
}

.el-menu {
  border: none;
}

.el-menu-item {
  font-size: 18px;
  color:  #6B6B6B;
  padding: 0 40px !important;;
}
</style>