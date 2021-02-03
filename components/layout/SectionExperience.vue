<template>
  <section ref="section-experience" class="experience">
    <h3 class="experience__title">活動花絮</h3>
    <template v-if="getExperienceArticles.length > 0">
      <slick-carousel :width="carouselWidth" :height="231" :options="slickOptions">
        <div
          v-for="article in getExperienceArticles.slice(0, 4)"
          :key="article.id"
          class="experience__item"
          :style="{ height: '231px' }"
          :data-title="article.title"
          @click="$router.push(`/experience/${article.articleId}`)"
        >
          <img :src="`data:image/png;base64,${article.mainImage}`" :alt="article.title" />
        </div>
      </slick-carousel>
      <nuxt-link tag="button" to="/experience" class="experience__more">看更多成果照片</nuxt-link>
    </template>
    <div v-else class="no-data">目前沒有資料喔！</div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SectionHightlight',
  data() {
    return {
      carouselWidth: '',
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
    ...mapGetters('client', {
      getExperienceArticles: 'article/getExperienceArticles'
    })
  },
  mounted() {
    this.carouselWidth = `${this.$refs['section-experience'].clientWidth}px`
  }
}
</script>

<style lang="scss" scoped>
.experience {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-auto-flow: row;
  row-gap: 30px;

  &__title {
    justify-self: center;
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    color: #2f2f2f;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      top: -14px;
      left: -14px;
      z-index: -1;
      background-color: rgba($color: map-get($map: $colors, $key: primary), $alpha: 0.7);
      border-radius: 50%;
    }
  }

  &__item {
    background-size: cover;
    background-clip: content-box;
    background-position: center;
    background-repeat: no-repeat;
    padding: 0px 10px;
    outline: none;
    cursor: pointer;
    position: relative;
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
          width: calc(100% - 20px);
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          margin: 0 auto;
          font-weight: bold;
          display: flex;
          color: #ffffff;
          justify-content: flex-start;
          align-items: flex-end;
          font-size: 28px;
          line-height: 28px;
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
  &__more {
    cursor: pointer;
    justify-self: end;
    margin-top: 20px;
    border: none;
    outline: none;
    background-color: map-get($map: $colors, $key: primary);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
  }
  @media (min-width: 768px) {
    &__title {
      justify-self: start;
      font-size: 40px;
      line-height: 40px;
      &:before {
        width: 50px;
        height: 50px;
        top: -20px;
        left: -20px;
      }
    }
  }
}
</style>
