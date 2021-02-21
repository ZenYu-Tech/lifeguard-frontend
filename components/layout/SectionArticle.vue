<template>
  <section class="article">
    <div class="article__header">
      <h4>{{ article.title }}</h4>
      <time>{{ $formatDate(article.createdAt, true) }}</time>
    </div>
    <div class="article__content">
      <div v-html="article.content"></div>
    </div>
    <div class="article__footer">
      <button @click="$router.push(`/${category}`)">返回</button>
      <button v-if="!noMoreArticle" @click="next">下一則</button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionArticle',
  props: {
    article: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('client', {
      getPagination: 'article/getPagination'
    }),
    noMoreArticle() {
      return this.getPagination.next === null
    }
  },
  methods: {
    next() {
      if (!this.noMoreArticle) {
        const path = this.getPagination.next.replace(/http[s]*:\/\/.*?\//, '')
        this.$router.push(`/${path}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  row-gap: 30px;
  height: fit-content;
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      font-size: 28px;
      letter-spacing: 1px;
    }
    time {
      font-size: 18px;
      color: #696875;
    }
  }
  &__content {
    text-align: justify;
    word-break: break-all;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    button {
      color: map-get($map: $colors, $key: primary);
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 20px;
      padding: 0px;
    }
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    &__header {
      align-items: flex-start;
    }
  }
}
</style>
