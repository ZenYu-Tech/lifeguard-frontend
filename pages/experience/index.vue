<template>
  <main class="section-wrapper max-width">
    <section class="experience">
      <h3 class="experience__title">{{ this.title }}</h3>
      <div v-if="getArticlesByCategory('experience').length > 0" class="experience__wrapper">
        <nuxt-link
          v-for="(article, index) in getArticlesByCategory('experience')"
          :key="`${index}-${article.articleId}`"
          tag="div"
          :to="`/experience/${article.articleId}`"
          class="experience__item"
          :data-title="article.title"
        >
          <img :src="`data:image/png;base64,${article.mainImage}`" :alt="article.title" />
        </nuxt-link>
      </div>
      <div v-else class="no-data">目前沒有資料喔！</div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Experience',
  head() {
    return {
      title: this.title
    }
  },
  meta: {
    haveBanner: false
  },
  async asyncData({ store }) {
    const category = 'experience'
    const count = 12
    const page = 1
    await store.dispatch('client/article/fetchArticles', { category, count, page })
    return { category, count }
  },
  data() {
    return {
      title: '活動花絮',
      category: '',
      count: 0,
      page: 1
    }
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory',
      getPagination: 'article/getPagination'
    })
  },
  mounted() {
    window.onscroll = this.infiniteScroll
    this.$once('hook:beforeDestroy', () => {
      window.onscroll = null
    })
    // Call the function first to avoid origin window being too height to never trigger scroll event
    this.infiniteScroll()
  },
  methods: {
    ...mapActions('client', {
      fetchArticles: 'article/fetchArticles'
    }),
    async infiniteScroll() {
      const footerHeight = document.querySelector('.footer').clientHeight
      const totalHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollTop = document.documentElement.scrollTop

      if (totalHeight - footerHeight <= windowHeight + scrollTop) {
        const { totalPage } = this.getPagination
        if (this.page === totalPage) {
          return
        }
        if (this.page < totalPage) {
          await this.fetchArticles({ category: this.category, count: this.count, page: ++this.page })
        }
        this.infiniteScroll()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  position: relative;
  padding: 100px 18px 70px 18px;

  @media (min-width: 768px) {
    padding: 100px 35px 70px 35px;
  }
  @media (min-width: 1200px) {
    padding: 150px 90px 70px 90px;
  }
}

.experience {
  display: grid;
  row-gap: 35px;
  &__title {
    justify-self: center;
    font-size: 32px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 45px;
      height: 45px;
      top: -10px;
      left: -18px;
      z-index: -1;
      background-color: rgba($color: map-get($map: $colors, $key: primary), $alpha: 0.7);
      border-radius: 50%;
    }
  }
  &__wrapper {
    display: grid;
    grid-auto-flow: row;
    --column-count: 1;
    grid-template-columns: repeat(var(--column-count), 1fr);
    grid-auto-rows: 257px;
    row-gap: 57px;
  }
  &__item {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
      @media (min-width: 1200px) {
        opacity: 1;
        &::after {
          content: attr(data-title);
          position: absolute;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          margin: 0 auto;
          display: flex;
          color: #ffffff;
          justify-content: flex-start;
          align-items: flex-end;
          font-size: 28px;
          padding: 14px;
        }
      }
    }
    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: 768px) {
    &__wrapper {
      --column-count: 2;
      column-gap: 20px;
    }
  }
  @media (min-width: 1200px) {
    &__wrapper {
      --column-count: 3;
      column-gap: 20px;
    }
  }
}
</style>
