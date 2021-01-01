<template>
  <article class="news">
    <div class="news__header">
      <h6 class="news__title">{{ news.title }}</h6>
      <time class="news__time">{{ dateFormator(news.createdAt) }}</time>
    </div>
    <p class="news__content">{{ news.content }}</p>
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
  },
  methods: {
    dateFormator(date) {
      return new Date(date).toISOString().slice(0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  &__header {
    display: grid;
    grid-template-columns: 14px 1fr 83px;
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
  &__title {
    font-family: Noto Sans TC;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
    line-height: 25px;
  }
  &__time {
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 25px;
    color: #a9abb3;
  }
  &__content {
    margin-top: 16px;
    padding: 13px 19px;
    background-color: map-get($map: $colors, $key: primary);
    border-radius: 5px;
    font-size: 18px;
    line-height: 26px;
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
}
</style>
