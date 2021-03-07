<template>
  <main class="section-wrapper max-width">
    <section-training :display-amount="videoDisplayAmount"></section-training>
    <span v-if="!noMoreVideo" @click="loadMoreVideo">載入更多</span>
    <section-experience></section-experience>
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
    await store.dispatch('client/article/fetchArticles', { category: 'experenice' })
    await store.dispatch('client/video/fetchVideos')
  },
  data() {
    return {
      title: '教學影片',
      videoDisplayAmount: 6
    }
  },
  computed: {
    ...mapGetters('client', {
      getVideos: 'video/getVideos'
    }),
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    noMoreVideo() {
      return this.videoDisplayAmount === this.getVideos.length || this.getVideos.length === 0
    },
    increaseUnit() {
      return this.getCurrentDevice === 'desktop' ? 3 : 4
    }
  },
  created() {
    if (this.getCurrentDevice === 'mobile') {
      this.videoDisplayAmount = 4
    }
  },
  methods: {
    loadMoreVideo() {
      this.videoDisplayAmount = Math.min(this.getVideos.length, this.videoDisplayAmount + this.increaseUnit)
    }
  },
  head() {
    return {
      title: this.title
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
    cursor: pointer;
    justify-self: center;
    font-size: 16px;
    color: map-get($map: $colors, $key: primary);
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
