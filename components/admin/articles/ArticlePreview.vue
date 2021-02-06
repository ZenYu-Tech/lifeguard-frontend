<template>
  <el-dialog title="查看" :visible.sync="dialogVisible" width="70%" :show-close="false" :close-on-click-modal="false">
    <el-row :gutter="20"
      ><el-col :span="12">
        <el-input v-model="articleContent.title" :disabled="true">
          <template slot="prepend">標題</template>
        </el-input></el-col
      >
      <el-col :span="12">
        <el-input v-model="category" :disabled="true">
          <template slot="prepend">類別</template>
        </el-input>
      </el-col></el-row
    >
    <div class="divide">以下內容</div>
    <el-row>
      <div v-html="articleContent.content"></div>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">關閉</el-button>
      <el-button type="primary" @click="handleEdit">編輯</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'ArticlePreview',
  props: {
    dialogVisible: { type: Boolean, required: true },
    articleContent: { type: Object, required: true }
  },
  computed: {
    category() {
      if (this.articleContent.category === 'news') return '通知中心'
      return '成果花絮'
    }
  },
  methods: {
    handleEdit() {
      this.$router.push(`/admin/articles/update?action=edit`)
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
.divide {
  margin-top: 30px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 16px;
}
</style>
