<template>
  <div class="admin-container">
    <article-form :article-content="articleContent"></article-form>
  </div>
</template>
<script>
import ArticleForm from '@/components/admin/articles/ArticleForm'

const article = {
  id: 10,
  title: '這是一篇測試文章',
  content:
    '<p class="ql-align-center">dmormf</p><pre class="ql-syntax ql-align-center" spellcheck="false">fmlmerl;f\n</pre><ul data-checked="false"><li class="ql-align-center">dmrfm;r</li></ul>',
  category: 'news'
}

export default {
  name: 'ArticleEdit',
  layout: 'admin',
  components: { ArticleForm },
  data() {
    return {
      articleContent: {
        id: '',
        title: '',
        content: '',
        category: '',
        image: []
      }
    }
  },
  created() {
    this.articleContent = article
  }
}
</script>
