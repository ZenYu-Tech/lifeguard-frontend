<template>
  <main>
    <section class="banner" :style="{ 'background-image': `url(${require('@/assets/images/banner.png')})` }"></section>
    <div class="section__wrapper">
      <section class="section__container__news">
        <h3 class="section__title">最新消息</h3>
        <card-news v-for="news in getArticlesByCategory('news')" :key="news.id" :news="news"></card-news>
      </section>
      <section class="section__container__training">
        <h3 class="section__title">訓練影片</h3>
        <card-video v-for="video in getVideos.slice(0, 2)" :key="video.id" :video="video"></card-video>
      </section>
      <section class="section__container__highlight">
        <h3 class="section__title">活動花絮</h3>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      getArticlesByCategory: 'article/getArticlesByCategory',
      getVideos: 'video/getVideos'
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100vw;
  height: 667px;
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
}

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
      display: grid;
      grid-auto-flow: row;
      grid-auto-rows: max-content;
      row-gap: 26px;
      padding: 40px 12px 30px 12px;
      position: relative;
      & > .section__title {
        position: absolute;
        left: 12px;
        top: 0px;
        transform: translateY(-50%);
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
</style>
