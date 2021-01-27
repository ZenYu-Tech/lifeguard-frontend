<template>
  <div class="admin-container">
    <el-table :data="tableData" style="width: 100%" height="75vh">
      <el-table-column prop="title" label="文章標題"> </el-table-column>
      <el-table-column prop="category" label="類別" width="120"> </el-table-column>
      <el-table-column prop="created_time" label="建立時間" width="120"> </el-table-column>
      <el-table-column align="right" width="120">
        <template slot="header">
          <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleRead(row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(row)">編輯</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 20px">
      <pagination :page="page" :count="count" :total="123"></pagination>
    </div>
    <article-preview
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :article-content="targetArticle"
    ></article-preview>
  </div>
</template>
<script>
import ArticlePreview from '@/components/admin/articles/ArticlePreview'
import Pagination from '@/components/admin/Pagination'

const newsData = [
  {
    id: 1,
    title: '109年第一梯次檢定通過名單出爐！',
    content: '<h1>Hello World</h1>',
    category: '通知中心',
    created_time: '2020-01-01'
  },
  {
    id: 2,
    title: '109年第一梯次檢定通過名單出爐！',
    content: '<h1>Hello World</h1>',
    category: '活動花絮',
    created_time: '2020-01-01'
  },
  {
    id: 3,
    title: '109年第一梯次檢定通過名單出爐！',
    content: '<h1>Hello World</h1>',
    category: '通知中心',
    created_time: '2020-01-01'
  },
  {
    id: 4,
    title: '109年第一梯次檢定通過名單出爐！',
    content: '<h1>Hello World</h1>',
    category: '活動花絮',
    created_time: '2020-01-01'
  }
]

export default {
  name: 'Articles',
  layout: 'admin',
  components: { ArticlePreview, Pagination },
  async asyncData({ store }) {
    await store.dispatch('admin/article/fetchArticles', { count: 10, page: 1 })
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      targetArticle: null,
      count: 10,
      page: 1
    }
  },
  created() {
    this.tableData = newsData
  },
  methods: {
    handleRead(rowData) {
      this.targetArticle = rowData
      this.dialogVisible = true
    },
    handleEdit(rowData) {
      this.$router.push(`/admin/articles/edit/${rowData.id}`)
    },
    handleCreate() {
      this.$router.push('/admin/articles/create')
    }
  }
}
</script>
