<template>
  <main class="section-wrapper">
    <section class="news">
      <h3 class="news__title">開課公告</h3>
      <template v-if="newsLength !== 0">
        <div class="news__wrapper max-width">
          <card-news-square
            v-for="(news, index) in getArticlesByCategory('news').slice(0, newsDisplayAmount)"
            :key="`${index}-${news.articleId}`"
            :news="news"
            @click.native="go2DetailPage(news.articleId)"
          ></card-news-square>
        </div>
        <button v-if="!noMoreNews" class="news__more" @click="loadMoreNews">顯示較早的公告</button>
      </template>
      <div v-else class="no-data">目前沒有資料喔！</div>
    </section>
    <section class="section__more">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
      <nuxt-link tag="button" to="/experience">看更多成果照片</nuxt-link>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'News',
  meta: {
    haveBanner: false
  },
  async asyncData({ store }) {
    await store.dispatch('client/article/fetchArticles', { category: 'news' })
  },
  data() {
    return {
      newsDisplayAmount: 3
    }
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory',
      getPagination: 'article/getPagination'
    }),
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    newsLength() {
      return this.getArticlesByCategory('news').length
    },
    noMoreNews() {
      return this.newsDisplayAmount === this.newsLength || this.newsLength === 0
    },
    increaseUnit() {
      switch (this.getCurrentDevice) {
        case 'mobile':
          return 5
        case 'tablet':
          return 6
        case 'desktop':
          return 9
        default:
          return 5
      }
    }
  },
  created() {
    // only active at client side
    this.newsDisplayAmount = this.increaseUnit
  },
  methods: {
    ...mapActions('client', {
      fetchArticles: 'article/fetchArticles'
    }),
    async loadMoreNews() {
      if (this.newsDisplayAmount + this.increaseUnit >= this.newsLength) {
        const { page, totalPage } = this.getPagination
        if (page !== totalPage) {
          await this.fetchArticles({ category: 'news', count: 10, page: page + 1 })
        }
      }
      if (!this.noMoreNews) {
        this.newsDisplayAmount = Math.min(this.newsLength, this.newsDisplayAmount + this.increaseUnit)
      }
    },
    go2DetailPage(id) {
      this.$router.push(`/news/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  position: relative;

  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
  }
}

.news {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('~@/assets/images/news-banner.png');
  padding: 100px 0px 50px 0px;

  display: grid;
  row-gap: 30px;
  &__title {
    justify-self: center;
    font-size: 32px;
    color: rgba(47, 47, 47, 0.9);
  }
  &__wrapper {
    padding: 18px;
    display: grid;
    --column-count: 1;
    --row-counts: 5;
    grid-template-columns: repeat(var(--column-count), 1fr);
    grid-auto-flow: row;
    grid-auto-rows: 270px;
    row-gap: 30px;
    height: calc(var(--row-counts) * 270px + (var(--row-counts) - 1) * 30px + 2 * 18px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__more {
    cursor: pointer;
    justify-self: center;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    color: white;
    padding: 8px 40px;
    margin-top: 10px;
  }
  @media (min-width: 768px) {
    padding: 130px 12px 50px 12px;
    &__wrapper {
      --column-count: 2;
      --row-counts: 3;
      column-gap: 20px;
    }
    &__more {
      margin-top: 30px;
    }
  }
  @media (min-width: 1200px) {
    padding: 130px 72px 50px 72px;
    &__wrapper {
      --column-count: 3;
      --row-counts: 3;
      column-gap: 60px;
    }
    &__more {
      margin-top: 60px;
    }
  }
}

.section__more {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  background-image: url('~@/assets/images/news-more.png');
  padding: 130px 18px 50px 18px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 28px;
    text-align: justify;
    word-break: break-all;
    width: 74%;
  }
  button {
    cursor: pointer;
    margin-top: 40px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    color: white;
    outline: none;
    padding: 10px 20px;
  }

  @media (min-width: 768px) {
    align-items: flex-end;
    p {
      width: 35%;
    }
    button {
    }
  }
  @media (min-width: 1200px) {
    P {
      width: 30%;
    }
  }
}
</style>
