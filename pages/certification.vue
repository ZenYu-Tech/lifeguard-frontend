<template>
  <main class="section-wrapper">
    <section class="pass-list">
      <h3 class="pass-list__title">檢定通過名單</h3>
      <div class="pass-list__file-wrapper">
        <div
          v-for="file in getFilesByCategory('certification').slice(0, 10)"
          :key="file.fileId"
          class="pass-list__file"
          @click="downloadFile({ fileId: file.fileId, title: file.title })"
        >
          <span>{{ file.title }}ddsdsdsdsdsds</span>
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/download.svg')})` }"></i>
        </div>
      </div>
    </section>
    <section-highlight :article-highlights="getArticlesByCategory('news').slice(0, 4)"></section-highlight>
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
    await store.dispatch('article/fetchArticles', { category: 'news' })
    await store.dispatch('file/fetchFiles', { category: 'certification' })
  },
  computed: {
    ...mapGetters({
      getArticlesByCategory: 'article/getArticlesByCategory',
      getFilesByCategory: 'file/getFilesByCategory'
    })
  },
  methods: {
    ...mapActions({
      downloadFile: 'file/downloadFile'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  padding: 30px 17px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 30px;
  position: relative;
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
  }
}

.pass-list {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px 6px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 5px;
  width: calc(100% - 23px * 2);
  margin: 0 23px;
  height: 566px;
  position: absolute;
  z-index: 100;
  top: 70px;
  transform: translateY(-100%);
  padding: 60px 0px;
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    color: rgba(47, 47, 47, 0.9);
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
    span {
      font-size: 20px;
      line-height: 30px;
      color: #2f2f2f;
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
    margin: 0 245px;
    &__file {
      span {
        max-width: 500px;
      }
    }
  }
}
</style>