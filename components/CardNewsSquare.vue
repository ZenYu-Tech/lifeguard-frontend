<template>
  <article class="card-news" @click="$router.push(`/news/${news.articleId}`)">
    <h6 class="card-news__title">{{ news.title }}</h6>
    <p class="card-news__content" v-html="news.mainPoint"></p>
    <time class="card-news__time">{{ $formatDate(news.createdAt, true) }}</time>
  </article>
</template>

<script>
export default {
  name: 'CardNewsSquare',
  props: {
    news: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-news {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 15px 20px;
  &__title {
    font-size: 20px;
    padding-bottom: 10px;
    color: map-get($map: $colors, $key: primary);
    font-weight: bold;
    letter-spacing: 1px;
  }
  &__content {
    font-size: 16px;
    text-align: justify;
    word-break: break-all;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &__time {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    padding-top: 10px;
  }

  @media (min-width: 1200px) {
    &__title {
      font-size: 24px;
    }
    &__content {
      font-size: 20px;
    }
    &__time {
      font-size: 16px;
    }
  }
}
</style>
