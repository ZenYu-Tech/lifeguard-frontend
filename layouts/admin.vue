<template>
  <div class="admin-layout">
    <div class="admin-layout__header">
      <el-breadcrumb separator="-">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <side-bar class="admin-layout__sidebar"></side-bar>
    <div class="admin-layout__container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  middleware: 'authenticate',
  data() {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler(newValue) {
        console.log(newValue)
        this.breadcrumbList = this.findCorrespondingChinese(newValue)
      }
    }
  },
  methods: {
    findCorrespondingChinese(word) {
      console.log(this.$route)
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

      if (secondWord === 'update') {
        switch (this.$route.query.action) {
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
.admin-layout {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 240px auto;
  grid-template-rows: 70px auto;
  grid-template-areas:
    'sidebar header'
    'sidebar container';
  column-gap: 40px;
  background: #f1f1f1;

  &__header {
    grid-area: header;
    background: transparent;
    display: flex;
    align-items: center;
    height: 70px;

    .el-breadcrumb__item {
      font-size: 20px;
      color: #4a4a4a;
    }
  }
  &__sidebar {
    grid-area: sidebar;
  }
  &__container {
    grid-area: container;
    margin-right: 40px;
    margin-bottom: 40px;
    overflow-y: scroll;
    overflow-x: visible;
    > div {
      padding: 20px 30px;
      background: #ffffff;
      border-radius: 8px;
    }
  }
}
</style>
