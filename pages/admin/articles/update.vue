<template>
  <div class="admin-container">
    <article-form v-loading="loading" :article-content="articleForm" @submitForm="submitForm"></article-form>
  </div>
</template>
<script>
import ArticleForm from '@/components/admin/articles/ArticleForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticleUpdate',
  layout: 'admin',
  components: { ArticleForm },
  data() {
    return {
      articleForm: {
        title: '',
        mainPoint: '',
        content: '',
        category: '',
        images: [],
        mainImageIndex: 0,
        newAddImages: []
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters('admin', {
      getArticle: 'article/getArticle'
    }),
    getAction() {
      return this.$route.query.action
    }
  },
  created() {
    if (this.getAction === 'edit') {
      this.articleForm = Object.assign(this.articleForm, JSON.parse(JSON.stringify(this.getArticle)))
    }
  },
  methods: {
    ...mapActions({
      createArticle: 'admin/article/createArticle',
      editArticle: 'admin/article/editArticle'
    }),
    async submitForm(formData) {
      this.loading = true
      if (formData.newAddImages.length === 0) {
        const oldMainImage = formData.images.find(img => img.main)
        formData.mainImageIndex = oldMainImage.imageId
      }

      try {
        if (this.getAction === 'edit') {
          await this.editArticle(formData)
        } else {
          await this.createArticle(formData)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        this.$router.back()
      }
    }
  }
}
</script>
