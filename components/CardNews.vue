<template>
  <article class="card-news" @click="$router.push(`/news/${news.articleId}`)">
    <div class="card-news__header">
      <h6 class="card-news__title">{{ news.title }}</h6>
      <time class="card-news__time">{{ $formatDate(news.createdAt) }}</time>
    </div>
    <p class="card-news__content" v-html="news.content"></p>
  </article>
</template>

<script>
export default {
  name: 'CardNews',
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
  width: 80%;
  cursor: pointer;
  &__header {
    display: grid;
    grid-template-columns: 14px 1fr 100px;
    grid-template-rows: 25px;
    column-gap: 5px;
    align-items: center;
    &::before {
      position: relative;
      content: '';
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: map-get($map: $colors, $key: primary);
    }
  }
  &:nth-child(even) &__header::before {
    background-color: #75c26a;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    line-height: 25px;
  }
  &__time {
    font-size: 15px;
    color: #a9abb3;
  }
  &__content {
    margin-top: 16px;
    padding: 10px 18px;
    background-color: map-get($map: $colors, $key: primary);
    border-radius: 5px;
    font-size: 15px;
    line-height: 1.5;
    color: #ffffff;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0px;
      transform: translateY(-90%);
      left: 18px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 14px 10px;
      border-color: transparent transparent map-get($map: $colors, $key: primary) transparent;
    }
  }
  &:nth-child(even) &__content::before {
    border-color: transparent transparent #75c26a transparent;
  }
  &:nth-child(even) &__content {
    background-color: #75c26a;
  }
}
</style>
