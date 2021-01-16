<template>
  <main class="section-wrapper">
    <client-only>
      <section-training :videos="getVideos.slice(0, videoDisplayAmount)"></section-training>
      <span v-if="!noMoreVideo" @click="loadMoreVideo">載入更多</span>
    </client-only>
    <section-highlight :article-highlights="getArticlesByCategory('news').slice(0, 4)"></section-highlight>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Training',
  meta: {
    haveBanner: true
  },
  async asyncData({ store }) {
    await store.dispatch('client/article/fetchArticles', { category: 'news' })
    await store.dispatch('client/video/fetchVideos')
  },
  data() {
    return {
      videoDisplayAmount: 6
    }
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory',
      getVideos: 'video/getVideos'
    }),
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    noMoreVideo() {
      return this.videoDisplayAmount === this.getVideos.length
    },
    increaseUnit() {
      return this.getCurrentDevice === 'desktop' ? 3 : 4
    }
  },
  created() {
    // only active at client side
    if (this.getCurrentDevice === 'mobile') {
      this.videoDisplayAmount = 4
    }
  },
  methods: {
    loadMoreVideo() {
      this.videoDisplayAmount = Math.min(this.getVideos.length, this.videoDisplayAmount + this.increaseUnit)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  padding: 30px 17px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 30px;

  > span:nth-child(2) {
    justify-self: center;
    font-size: 16px;
    line-height: 16px;
    color: map-get($map: $colors, $key: primary);
    font-weight: bold;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) {
    padding: 50px 30px;
  }
  @media (min-width: 1200px) {
    padding: 50px 100px;
    &::v-deep {
      > .training > .training__wrapper {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
}
</style>
