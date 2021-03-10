<template>
  <main class="section-wrapper">
    <section class="pass-list">
      <h3 class="pass-list__title">{{ title }}</h3>
      <div v-if="getCertificationFiles.length > 0" class="pass-list__file-wrapper">
        <div
          v-for="file in getCertificationFiles.slice(0, 10)"
          :key="file.fileId"
          class="pass-list__file"
          @click="downloadFile({ fileId: file.fileId })"
        >
          <span>{{ file.title }}</span>
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/download.svg')})` }"></i>
        </div>
      </div>
      <div v-else class="no-data">目前沒有資料喔！</div>
    </section>
    <section class="news">
      <h3 class="news__title">最新消息</h3>
      <div v-if="getArticlesByCategory('news').length > 0" class="news__wrapper max-width">
        <card-news-square
          v-for="news in getArticlesByCategory('news').slice(0, newsDisplayAmount)"
          :key="news.id"
          :news="news"
        ></card-news-square>
      </div>
      <div v-else class="no-data">目前沒有資料喔</div>
    </section>
    <section-experience class="max-width"></section-experience>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Certification',
  meta: {
    haveBanner: true
  },
  async asyncData({ store }) {
    await store.dispatch('client/article/fetchArticles', { category: 'news' })
    await store.dispatch('client/article/fetchArticles', { category: 'experience' })
    await store.dispatch('client/file/fetchCertificationFiles')
  },
  data() {
    return {
      title: '檢定通過名單',
      newsDisplayAmount: 3
    }
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory',
      getCertificationFiles: 'file/getCertificationFiles'
    }),
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    })
  },
  created() {
    if (this.getCurrentDevice === 'tablet') {
      this.newsDisplayAmount = 4
    }
  },
  methods: {
    ...mapActions('client', {
      downloadFile: 'file/downloadFile'
    })
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
  position: relative;
  > section:nth-child(3) {
    margin: 60px 17px;
  }
  @media (min-width: 768px) {
    > section:nth-child(3) {
      margin: 60px 30px;
    }
  }
  @media (min-width: 1200px) {
    > section:nth-child(3) {
      margin: 60px 80px;
    }
  }
}

.pass-list {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 5px;
  width: calc(100% - 23px * 2);
  margin: 0 23px;
  height: 450px;
  position: absolute;
  z-index: 100;
  top: 70px;
  transform: translateY(-100%);
  padding: 60px 0px;
  &__title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__file-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    row-gap: 10px;
    justify-items: center;
  }
  &__file {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      span {
        color: map-get($map: $colors, $key: primary);
      }
      i {
        background-color: map-get($map: $colors, $key: primary);
      }
    }
    span {
      font-size: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 200px;
    }
    i {
      margin-left: 5px;
      background-color: #2f2f2f;
    }
  }
  @media (min-width: 768px) {
    width: calc(100% - 60px * 2);
    margin: 0 60px;
    &__file {
      span {
        max-width: 400px;
      }
    }
  }
  @media (min-width: 1200px) {
    width: calc(100% - 245px * 2);
    max-width: 900px;
    margin: 0 calc((100vw - 900px) / 2);
    &__file {
      span {
        max-width: 500px;
      }
    }
  }
}

.news {
  background: linear-gradient(to bottom, rgba(117, 193, 106, 0.3) 0%, #fff 100%);
  padding: 136px 17px 84px 17px;
  &__title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
    grid-auto-flow: row;
    row-gap: 30px;
  }
  @media (min-width: 768px) {
    &__wrapper {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 210px;
      column-gap: 30px;
    }

    &__title {
      font-size: 36px;
    }
  }
  @media (min-width: 1200px) {
    padding: 136px 90px 84px 90px;
    &__wrapper {
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: 270px;

      column-gap: 50px;
    }
  }
}
</style>
