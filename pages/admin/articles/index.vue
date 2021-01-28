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
    <article-preview
      v-if="dialogVisible"
      v-loading="loading"
      :dialog-visible="dialogVisible"
      :article-content="getArticle"
      @closeDialog="closeDialog"
    ></article-preview>
  </div>
</template>
<script>
import ArticlePreview from '@/components/admin/articles/ArticlePreview'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Articles',
  layout: 'admin',
  components: { ArticlePreview },
  async asyncData({ store }) {
    await store.dispatch('admin/article/fetchArticles', { count: 100, page: 1 })
  },
  data() {
    return {
      dialogVisible: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('admin', {
      getArticles: 'article/getArticles',
      getArticle: 'article/getArticle'
    })
  },
  methods: {
    ...mapActions({
      fetchArticle: 'admin/article/fetchArticle'
    }),
    handleRead(rowData) {
      this.loading = true
      this.fetchArticle({ category: rowData.category, articleId: rowData.articleId }).then(() => {
        this.loading = false
        this.dialogVisible = true
      })
    },
    handleEdit(rowData) {
      this.loading = true
      this.fetchArticle({ category: rowData.category, articleId: rowData.articleId }).then(() => {
        this.loading = false
        this.$router.push('/admin/articles/update?action=edit')
      })
    },
    handleCreate() {
      this.$router.push('/admin/articles/update?action=create')
    },
    closeDialog(value) {
      this.dialogVisible = value
    }
  }
}
</script>
