<template>
  <main class="section-wrapper">
    <section class="news">
      <h3 class="news__title">最新消息</h3>
      <client-only>
        <div class="news__wrapper">
          <card-news-square
            v-for="news in getArticlesByCategory('news').slice(0, newsDisplayAmount)"
            :key="news.id"
            :news="news"
          ></card-news-square>
        </div>
      </client-only>
      <button v-if="!noMoreNews" class="news__more" @click="loadMoreNews">顯示較早的公告</button>
    </section>
    <section class="section__more">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
      <button>看更多成果照片</button>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'News',
  meta: {
    haveBanner: false
  },
  async asyncData({ store }) {
    await store.dispatch('article/fetchArticles', { category: 'news' })
  },
  data() {
    return {
      newsDisplayAmount: 3
    }
  },
  computed: {
    ...mapGetters({
      getArticlesByCategory: 'article/getArticlesByCategory',
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    noMoreNews() {
      return this.newsDisplayAmount === this.getArticlesByCategory('news').length
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
    loadMoreNews() {
      const maxLenght = this.getArticlesByCategory('news').length
      this.newsDisplayAmount = Math.min(maxLenght, this.newsDisplayAmount + this.increaseUnit)
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
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    color: rgba(47, 47, 47, 0.9);
  }
  &__wrapper {
    padding: 18px;
    display: grid;
    --column-count: 1;
    --row-counts: 5;
    grid-template-columns: repeat(var(--column-count), 1fr);
    grid-auto-flow: row;
    grid-auto-rows: 342px;
    row-gap: 30px;
    height: calc(var(--row-counts) * 342px + (var(--row-counts) - 1) * 30px + 2 * 18px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__more {
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
    line-height: 32px;
    text-align: justify;
    word-break: break-all;
    width: 74%;
  }
  button {
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
