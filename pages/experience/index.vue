<template>
  <main class="section-wrapper">
    <section class="experience">
      <h3 class="experience__title">活動花絮</h3>
      <div class="experience__wrapper">
        <template v-for="article in getArticlesByCategory('experience')">
          <nuxt-link
            :key="article.articleId"
            tag="div"
            :to="`/experience/${article.articleId}`"
            class="experience__item"
            :data-title="article.title"
          >
            <img :src="`data:image/png;base64,${article.mainImage}`" :alt="article.title" />
          </nuxt-link>
        </template>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Experience',
  meta: {
    haveBanner: false
  },
  async asyncData({ store }) {
    await store.dispatch('client/article/fetchArticles', { category: 'experience' })
  },
  computed: {
    ...mapGetters('client', {
      getArticlesByCategory: 'article/getArticlesByCategory'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  position: relative;
  padding: 130px 18px 70px 18px;

  @media (min-width: 768px) {
    padding: 130px 35px 70px 35px;
  }
  @media (min-width: 1200px) {
    padding: 130px 90px 70px 90px;
  }
}

.experience {
  display: grid;
  row-gap: 35px;
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
  &__wrapper {
    display: grid;
    grid-auto-flow: row;
    --column-count: 1;
    grid-template-columns: repeat(var(--column-count), 1fr);
    grid-auto-rows: 257px;
    row-gap: 57px;
  }
  &__item {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
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
          width: 100%;
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

  @media (min-width: 768px) {
    &__wrapper {
      --column-count: 2;
      column-gap: 20px;
    }
  }
  @media (min-width: 1200px) {
    &__wrapper {
      --column-count: 4;
      column-gap: 20px;
    }
  }
}
</style>