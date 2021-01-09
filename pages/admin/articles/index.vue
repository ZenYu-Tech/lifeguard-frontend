<template>
  <div class="admin-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="文章標題"> </el-table-column>
      <el-table-column prop="category" label="類別" width="120"> </el-table-column>
      <el-table-column prop="created_time" label="建立時間" width="120"> </el-table-column>
      <el-table-column align="right" width="120">
        <template slot="header">
          <el-button type="primary" size="small">新增</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button @click="handleRead(row)" type="text" size="small">查看</el-button>
          <el-button @click="handleEdit(row)" type="text" size="small">編輯</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
const newsData = [
  { title: '109年第一梯次檢定通過名單出爐！', category: '通知中心', created_time: '2020-01-01' },
  { title: '109年第一梯次檢定通過名單出爐！', category: '活動花絮', created_time: '2020-01-01' },
  { title: '109年第一梯次檢定通過名單出爐！', category: '通知中心', created_time: '2020-01-01' },
  { title: '109年第一梯次檢定通過名單出爐！', category: '活動花絮', created_time: '2020-01-01' }
]

export default {
  name: 'article',
  layout: 'admin',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.tableData = newsData
  },
  methods: {
    handleRead(rowData) {
      console.log('rowData', rowData)
    },
    handleEdit(rowData) {
      console.log('rowData', rowData)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>