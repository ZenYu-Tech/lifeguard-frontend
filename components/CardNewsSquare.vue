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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75px auto 20px;
  row-gap: 8px;
  padding: 15px 20px;
  &__title {
    font-size: 24px;
    color: map-get($map: $colors, $key: primary);
    font-weight: bold;
    letter-spacing: 1px;
  }
  &__content {
    font-size: 20px;
    text-align: justify;
    word-break: break-all;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &__time {
    justify-self: end;
    font-size: 16px;
  }
}
</style>
