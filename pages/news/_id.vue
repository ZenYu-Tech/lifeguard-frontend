<template>
  <main class="section-wrapper">
    <section class="article">
      <div class="article__header">
        <h4>{{ article.title }}</h4>
        <time>{{ $formatDate(article.createdAt, true) }}</time>
      </div>
      <div class="article__content">
        <div v-html="article.content"></div>
      </div>
      <div class="article__footer">
        <button class="hidden-lg-only" @click="$router.push('/news')">返回</button>
        <button v-if="!noMoreArticle" @click="next">下一則</button>
      </div>
    </section>
    <section-training class="hidden-md-and-down" :videos="getVideos.slice(0, 2)"></section-training>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NewsDetail',
  meta: {
    haveBanner: true
  },
  async asyncData({ store, params }) {
    const articleId = params.id
    await store.dispatch('client/video/fetchVideos')
    await store.dispatch('client/article/fetchArticle', { category: 'news', articleId })
    return { articleId }
  },
  data() {
    return {
      articleId: ''
    }
  },
  computed: {
    ...mapGetters('client', {
      article: 'article/getArticle',
      getArticlesByCategory: 'article/getArticlesByCategory',
      getPagination: 'article/getPagination',
      getVideos: 'video/getVideos'
    }),
    articles() {
      return this.getArticlesByCategory('news')
    },
    currentIndex() {
      return this.articles.findIndex(article => article.articleId === this.articleId)
    },
    articleLength() {
      return this.articles.length
    },
    noMoreArticle() {
      const { page, totalPage } = this.getPagination
      return page === totalPage && this.currentIndex === this.articleLength - 1
    }
  },
  methods: {
    ...mapActions('client', {
      fetchArticles: 'article/fetchArticles'
    }),
    next() {
      if (this.currentIndex + 3 > this.articleLength - 1) {
        const { page, totalPage } = this.getPagination
        if (page !== totalPage) {
          this.fetchArticles({ category: 'news', count: 10, page: page + 1 })
        }
      }

      if (!this.noMoreArticle) {
        this.$router.push(`/news/${this.articles[this.currentIndex + 1].articleId}`)
      }
    }
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

.article {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  row-gap: 30px;
  height: fit-content;
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      font-size: 28px;
      line-height: 24px;
      margin-bottom: 5px;
    }
    time {
      font-size: 20px;
      line-height: 20px;
      color: #696875;
    }
  }
  &__content {
    text-align: justify;
    word-break: break-all;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    button {
      color: map-get($map: $colors, $key: primary);
      outline: none;
      border: none;
      background-color: transparent;
      font-weight: bold;
      font-size: 20px;
      line-height: 29px;
      padding: 0px;
    }
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    &__header {
      align-items: flex-start;
    }
  }
}
</style>
