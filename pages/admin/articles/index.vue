<template>
  <div v-loading="loading" class="admin-container">
    <el-table :data="getArticles" stripe style="width: 100%">
      <el-table-column prop="title" label="文章標題"> </el-table-column>
      <el-table-column prop="category" label="類別" width="120">
        <template slot-scope="{ row }">
          <span v-if="row.category === 'news'">通知中心</span>
          <span v-else>成果花絮</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="建立時間" width="150">
        <template slot-scope="{ row }">
          {{ $formatDate(row.createdAt, true) }}
        </template>
      </el-table-column>
      <el-table-column align="right" width="180">
        <template slot="header">
          <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleRead(row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(row)">編輯</el-button>
          <el-button type="text" size="mini" @click="handleDelete(row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 20px">
      <pagination
        :page="getPagination.page"
        :count="getPagination.count"
        :total="getPagination.totalCount"
        @jump="jump"
        @change-size="changeSize"
      ></pagination>
    </div>
    <article-preview
      v-if="dialogVisible"
      v-loading="loading"
      :dialog-visible="dialogVisible"
      :article-content="getArticle"
      @closeDialog="dialogVisible = false"
    ></article-preview>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Articles',
  layout: 'admin',
  async asyncData({ store }) {
    const { count, page } = store.getters['admin/article/getPagination']
    await store.dispatch('admin/article/fetchArticles', { count, page })
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      targetArticle: null
    }
  },
  computed: {
    ...mapGetters('admin', {
      getArticles: 'article/getArticles',
      getArticle: 'article/getArticle',
      getPagination: 'article/getPagination'
    })
  },
  methods: {
    ...mapActions('admin', {
      fetchArticle: 'article/fetchArticle',
      fetchArticles: 'article/fetchArticles',
      deleteArticle: 'article/deleteArticle'
    }),
    async handleRead(rowData) {
      this.loading = true
      await this.fetchArticle({ category: rowData.category, articleId: rowData.articleId })
      this.loading = false
      this.dialogVisible = true
    },
    async handleEdit(rowData) {
      this.loading = true
      await this.fetchArticle({ category: rowData.category, articleId: rowData.articleId })
      this.loading = false
      this.$router.push('/admin/articles/update?action=edit')
    },
    async handleDelete(rowData) {
      try {
        const result = await this.$confirm(`確定要刪除「${rowData.title}」這篇文章嗎？`, '確認刪除', {
          confirmButtonText: '確認',
          cancelButtonText: '返回',
          type: 'warning'
        })

        if (result === 'cancel') {
          return
        }

        this.loading = true
        await this.deleteArticle({ category: rowData.category, articleId: rowData.articleId })
        const { count, page } = this.getPagination
        await this.fetchArticles({ count, page })
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    handleCreate() {
      this.$router.push('/admin/articles/update?action=create')
    },
    closeDialog(value) {
      this.dialogVisible = value
    },
    async jump(page) {
      this.loading = true
      await this.fetchArticles({ count: this.getPagination.count, page })
      this.loading = false
    },
    async changeSize(count) {
      this.loading = true
      await this.fetchArticles({ count, page: this.getPagination.page })
      this.loading = false
    }
  }
}
</script>
