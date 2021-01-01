<template>
  <main class="section__wrapper">
    <section class="section__container__news">
      <h3 class="section__title">最新消息</h3>
      <div>
        <card-news v-for="news in getArticlesByCategory('news').slice(0, 4)" :key="news.id" :news="news"></card-news>
      </div>
    </section>
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
  name: 'Home',
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

<style lang="scss" scoped>
.section {
  &__wrapper {
    padding: 50px 17px;
    display: grid;
    grid-auto-flow: row;
    row-gap: 50px;
  }
  &__container {
    &__news {
      background: #f2f5f9;
      border-radius: 5px;
      position: relative;
      & > .section__title {
        position: absolute;
        left: 12px;
        top: 0px;
        transform: translateY(-50%);
      }
      > div:nth-child(2) {
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: max-content;
        row-gap: 26px;
        margin: 40px 30px;
        padding: 0px 12px;
        height: 636px;
        overflow-y: scroll;
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
    }
    &__training {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-flow: row;
      row-gap: 30px;
      & .section__title {
        justify-self: center;
      }
    }
    &__highlight {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      grid-auto-flow: row;
      row-gap: 30px;
      & .section__title {
        justify-self: center;
      }
      > button:nth-child(3) {
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
    }
  }
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 32px;
    color: #2f2f2f;
    position: relative;
    .section__container__training > &:before,
    .section__container__highlight > &:before {
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

  @media (min-width: 768px) {
    &__wrapper {
      padding: 70px 38px;
    }
    &__container {
      &__news {
        padding: 40px 30px 30px 30px;
      }
      &__training {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
          'title title'
          'video1 video2';
        row-gap: 23px;
        column-gap: 30px;
        & .section__title {
          justify-self: start;
          grid-area: title;
        }
        & > :nth-child(2) {
          grid-area: video1;
        }
        & > :nth-child(3) {
          grid-area: video2;
        }
      }
      &__highlight {
        & .section__title {
          justify-self: start;
        }
      }
    }
    &__title {
      font-size: 40px;
      line-height: 40px;
      .section__container__training > &:before,
      .section__container__highlight > &:before {
        width: 50px;
        height: 50px;
        top: -20px;
        left: -20px;
      }
    }
  }
  @media (min-width: 1200px) {
    &__wrapper {
      padding: 80px 100px;
      display: grid;
      grid-template-columns: auto 358px;
      grid-template-rows: max-content auto;
      grid-template-areas:
        'news training'
        'highlight highlight';
      column-gap: 80px;
      row-gap: 90px;
    }
    &__container {
      &__news {
        grid-area: news;
      }
      &__training {
        grid-area: training;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, auto);
        grid-template-areas:
          'title'
          'video1'
          'video2';
      }
      &__highlight {
        grid-area: highlight;
      }
    }
  }
}

.carousel__item {
  background-size: cover;
  background-clip: content-box;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0px 10px;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    @media (min-width: 1200px) {
      transform: scale(1.1);
    }
  }
  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
