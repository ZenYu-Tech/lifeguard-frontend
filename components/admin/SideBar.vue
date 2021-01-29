<template>
  <div class="sidebar">
    <div class="sidebar__logo">後台管理系統</div>
    <el-menu :default-active="currentRoute" active-text-color="#0082FE">
      <el-menu-item v-for="item in menuItem" :key="item.id" :index="item.id" @click="handleRouteChange(item.path)">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      menuItem: [
        { id: '1', name: '文章管理', path: 'articles' },
        { id: '2', name: '檔案管理', path: 'files' },
        { id: '3', name: '影片管理', path: 'videos' }
      ]
    }
  },
  computed: {
    currentRoute() {
      return this.menuItem.find(item => this.$route.path.includes(item.path)).id
    }
  },
  methods: {
    handleRouteChange(path) {
      this.$router.push(`/admin/${path}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #ffffff;
  width: 240px;
  height: 100%;
  box-shadow: 6px 0px 6px rgba(0, 0, 0, 0.1);
  &__logo {
    font-size: 28px;
    font-weight: bold;
    color: #4a4a4a;
    text-align: center;
    padding: 20px 0;
  }
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
