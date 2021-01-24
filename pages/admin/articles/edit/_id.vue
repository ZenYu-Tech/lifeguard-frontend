<template>
  <div class="admin-container">
    <article-form :article-content="getArticle"></article-form>
  </div>
</template>
<script>
import ArticleForm from '@/components/admin/articles/ArticleForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticleEdit',
  layout: 'admin',
  components: { ArticleForm },
  computed: {
    ...mapGetters('admin', {
      getArticle: 'article/getArticle'
    })
  },

  methods: {
    ...mapActions({
      editArticle: 'admin/article/editArticle'
    }),
    async submitForm(formData) {
      const { category, title, content, mainImageIndex, images } = formData
      await this.editArticle({ category, title, content, mainImageIndex, images })
    }
  }
}
</script>
