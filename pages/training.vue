<template>
  <main>
    <section class="section__container__training">
      <h3 class="section__title">訓練影片</h3>
      <card-video v-for="video in getVideos.slice(0, 2)" :key="video.id" :video="video"></card-video>
    </section>
    <section class="section__container__highlight">
      <h3 class="section__title">活動花絮</h3>
      <slick-carousel :width="'90vw'" :height="231" :options="slickOptions">
        <div
          v-for="highlight in getArticlesByCategory('news').slice(0, 4)"
          :key="highlight.id"
          class="carousel__item"
          :style="{ height: '231px' }"
        >
          <img :src="`data:image/png;base64,${highlight.mainImage}`" alt="ss" />
        </div>
      </slick-carousel>
      <button>
        看更多成果照片
        <i></i>
      </button>
    </section>
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
    await store.dispatch('article/fetchArticles', { category: 'news' })
  },
  data() {
    return {
      slickOptions: {
        dots: true,
        arrows: false,
        speed: 500,
        initialSlide: 0,
        slidesToScroll: 1,
        slidesToShow: 4,
        swipe: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              swipe: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              swipe: true
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      getArticlesByCategory: 'article/getArticlesByCategory',
      getVideos: 'video/getVideos'
    })
  }
}
</script>

<style lang="scss" scoped></style>
