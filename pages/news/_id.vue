<template>
  <main class="section-wrapper">
    <section-article :article="article" :category="'news'"></section-article>
    <section-training class="hidden-md-and-down" :display-amount="2"></section-training>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewsDetail',
  meta: {
    haveBanner: true
  },
  async asyncData({ store, params }) {
    const articleId = params.id
    await store.dispatch('client/video/fetchVideos')
    await store.dispatch('client/article/fetchArticle', { category: 'news', articleId })
  },
  computed: {
    ...mapGetters('client', {
      article: 'article/getArticle'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  margin: 40px 20px 20px 20px;
  @media (min-width: 768px) {
    margin: 50px 50px 30px 50px;
  }
  @media (min-width: 1200px) {
    margin: 60px 90px 60px 100px;
    display: grid;
    grid-template-columns: 1fr 358px;
    grid-template-rows: max-content;
    column-gap: 200px;
  }
}
</style>
