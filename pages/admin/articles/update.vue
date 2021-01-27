<template>
  <div class="admin-container">
    <article-form
      :article-content="getAction === 'create' ? articleForm : getClonedArticle"
      @submitForm="submitForm"
    ></article-form>
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
        content: '',
        category: '',
        images: [],
        mainImageIndex: 0
      },
      clonedArticle: {}
    }
  },
  computed: {
    ...mapGetters('admin', {
      getArticle: 'article/getArticle'
    }),
    getAction() {
      return this.$route.query.action
    },
    getClonedArticle() {
      const imagesArray = this.getArticle.images.map(item => {
        return { ...item, base64File: item?.image }
      })

      this.clonedArticle = JSON.parse(JSON.stringify(this.getArticle))

      this.clonedArticle.images = imagesArray

      return this.clonedArticle
    }
  },
  methods: {
    ...mapActions({
      createArticle: 'admin/article/createArticle',
      editArticle: 'admin/article/editArticle'
    }),
    async submitForm(formData) {
      const { articleId, category, title, content, mainImageIndex, images } = formData
      let res

      let formatImageArray = images.map(item => {
        return item.image
      })

      console.log('formatImageArray', formatImageArray)

      if (this.$route.query.action === 'create') {
        res = await this.createArticle({ category, title, content, mainImageIndex, formatImageArray })
      } else {
        res = await this.editArticle({ articleId, category, title, content, mainImageIndex, formatImageArray })
      }

      if (!res) return
      else this.$router.back()
    }
  }
}
</script>
