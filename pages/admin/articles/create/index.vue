<template>
  <div class="admin-container">
    <article-form :article-content="articleContent"></article-form>
  </div>
</template>
<script>
import articleForm from '@/components/admin/articles/articleForm'

export default {
  name: 'article-create',
  layout: 'admin',
  components: { articleForm },
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
