<template>
  <div class="admin-container">
    <article-form :article-content="articleContent" v-on:submitForm="submitForm"></article-form>
  </div>
</template>
<script>
import ArticleForm from '@/components/admin/articles/ArticleForm'
import { mapActions } from 'vuex'
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
        images: [],
        mainImageIndex: 0
      }
    }
  },
  methods: {
    ...mapActions({
      createArticle: 'admin/article/createArticle'
    }),
    async submitForm(formData) {
      const { category, title, content, mainImageIndex, images } = formData
      await this.createArticle({ category, title, content, mainImageIndex, images })
    }
  }
}
</script>
