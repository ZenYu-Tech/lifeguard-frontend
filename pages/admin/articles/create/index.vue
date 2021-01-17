<template>
  <div class="admin-container">
    <article-form :article-content="articleContent"></article-form>
  </div>
</template>
<script>
import ArticleForm from '@/components/admin/articles/ArticleForm'

export default {
  name: 'ArticleCreate',
  layout: 'admin',
  components: { ArticleForm },
  data() {
    return {
      articleContent: {
        title: '',
        content: '',
        category: '',
        image: []
      }
    }
  }
}
</script>
