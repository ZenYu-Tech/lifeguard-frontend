<template>
  <main class="section-wrapper">
    <section class="news">
      <h3 class="news__title">最新消息</h3>
      <div class="news__wrapper">
        <card-news v-for="news in getArticlesByCategory('news').slice(0, 4)" :key="news.id" :news="news"></card-news>
      </div>
    </section>
    <section-training :display-amount="2"></section-training>
    <section-experience></section-experience>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  meta: {
    haveBanner: true
  },
  async asyncData({ store }) {
    await store.dispatch('client/article/fetchArticles', { category: 'news' })
    await store.dispatch('client/article/fetchArticles', { category: 'experience' })
    await store.dispatch('client/video/fetchVideos')
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  padding: 50px 17px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 50px;

  @media (min-width: 768px) {
    padding: 70px 38px;
  }
  @media (min-width: 1200px) {
    padding: 80px 100px;
    display: grid;
    grid-template-columns: 1fr 358px;
    grid-template-rows: 676px auto;
    grid-template-areas:
      'news training'
      'experience experience';
    column-gap: 80px;
    row-gap: 90px;
    > section:nth-child(1) {
      grid-area: news;
    }
    > section:nth-child(2) {
      grid-area: training;
    }
    > section:nth-child(3) {
      grid-area: experience;
    }
  }
}

.news {
  background: #f2f5f9;
  border-radius: 5px;
  position: relative;
  height: 676px;
  padding: 40px 12px;

  &__title {
    position: absolute;
    left: 12px;
    top: 0px;
    transform: translateY(-50%);
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    color: #2f2f2f;
  }
  &__wrapper {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: max-content;
    row-gap: 26px;
    padding: 0px 12px;
    overflow-y: scroll;
    height: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
    & > :nth-child(odd) {
      justify-self: start;
    }
    & > :nth-child(even) {
      justify-self: end;
    }
  }
  @media (min-width: 768px) {
    padding: 40px 30px;
    &__title {
      font-size: 40px;
      line-height: 40px;
    }
  }
  @media (min-width: 1200px) {
  }
}
</style>
