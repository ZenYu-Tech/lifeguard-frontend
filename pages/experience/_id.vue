<template>
  <main class="section-wrapper max-width">
    <section class="section-image">
      <div
        class="section-image__main"
        :style="{ 'background-image': `url(data:image/png;base64,${mainImage.image})` }"
      ></div>
      <template v-if="carouselImages.length > 0">
        <slick-carousel :style="carosuelStyle" :options="slickOptions" class="section-image__carousel">
          <div
            v-for="(image, index) in carouselImages"
            :key="image.imageId"
            class="section-image__carousel-image"
            :style="carosuelStyle"
          >
            <img :src="`data:image/png;base64,${image.image}`" :alt="`圖片${index}`" />
          </div>
        </slick-carousel>
      </template>
    </section>
    <section-article :article="article" :category="category"></section-article>
    <section-training class="hidden-md-and-down" :display-amount="2"></section-training>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExperienceDetail',
  head() {
    return {
      title: this.article.title,
      titleTemplate: '%s'
    }
  },
  meta: {
    haveBanner: false
  },
  async asyncData({ store, params }) {
    const articleId = params.id
    await store.dispatch('client/video/fetchVideos')
    await store.dispatch('client/article/fetchArticle', { category: 'experience', articleId })
  },
  data() {
    return {
      category: 'experience',
      slickOptions: {
        dots: false,
        arrows: true,
        speed: 500,
        initialSlide: 0,
        slidesToScroll: 1,
        slidesToShow: 5,
        swipe: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              swipe: true,
              arrows: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              swipe: true,
              arrows: false
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('client', {
      article: 'article/getArticle'
    }),
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    mainImage() {
      return this.article.images.find(image => image.main)
    },
    carouselImages() {
      return this.article.images.filter(image => !image.main)
    },
    carosuelStyle() {
      return {
        height: this.getCurrentDevice === 'desktop' ? '120px' : '80px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  margin: 73px 20px 20px 20px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto max-content;
  row-gap: 45px;
  @media (min-width: 768px) {
    margin: 100px 50px 30px 50px;
  }
  @media (min-width: 1200px) {
    margin: 100px 100px 60px 100px;
    grid-template-columns: 1fr 358px;
    grid-template-rows: auto max-content;
    grid-template-areas:
      'image image'
      'article video';
    column-gap: 200px;
    > section:nth-child(1) {
      grid-area: image;
    }
    > section:nth-child(2) {
      grid-area: article;
    }
    > section:nth-child(3) {
      grid-area: video;
    }
  }
}

.section-image {
  --main-height: 450px;
  &__main {
    width: 100%;
    height: var(--main-height);
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
  }
  &__carousel {
    margin-top: 20px;
    &::v-deep {
      .slick-list {
        margin: 0 -5px;
      }
      .slick-arrow {
        &::before {
          font-size: 30px;
          color: gray;
        }
      }
      .slick-prev {
        left: -40px;
      }
      .slick-next {
        right: -40px;
      }
    }

    &-image {
      background-size: cover;
      background-clip: content-box;
      background-position: cent er;
      background-repeat: no-repeat;
      outline: none;
      padding: 0 5px;
      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  @media (min-width: 768px) {
    --main-height: 372px;
    margin: 0 60px;
  }
  @media (min-width: 1200px) {
    --main-height: 553px;
  }
}
</style>
