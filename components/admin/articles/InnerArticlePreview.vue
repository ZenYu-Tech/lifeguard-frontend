<template>
  <el-dialog title="預覽" :visible.sync="dialogVisible" width="70%" :show-close="false" :close-on-click-modal="false">
    <section class="article">
      <template v-if="articleContent.category === 'experience'">
        <section class="section-image">
          <div class="section-image__main" :style="{ 'background-image': `url(${getCarouselImage[0]})` }"></div>
          <template v-if="getCarouselImage.length > 0">
            <slick-carousel :options="slickOptions" class="section-image__carousel">
              <div v-for="(image, index) in getCarouselImage" :key="index" class="section-image__carousel-image">
                <img :src="`${image}`" :alt="`圖片${index}`" />
              </div>
            </slick-carousel>
          </template>
        </section>
      </template>
      <div class="article__header">
        <h4>{{ articleContent.title }}</h4>
        <time>{{ $formatDate(new Date(), true) }}</time>
      </div>
      <div class="article__content">
        <div v-html="articleContent.content"></div>
      </div>
    </section>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">關閉</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'InnerArticlePreview',
  props: {
    articleContent: { type: Object, required: true },
    dialogVisible: { type: Boolean, required: true },
    newAddPreviewImages: { type: Array, require: true }
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
        swipe: false
      }
    }
  },
  computed: {
    getCarouselImage() {
      const result = []
      this.articleContent.images.forEach(image => {
        result.push(`data:image/png;base64,${image.image}`)
      })
      this.newAddPreviewImages.forEach(image => {
        result.push(image)
      })
      return result
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
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
      line-height: 24px;
      margin-bottom: 5px;
    }
    time {
      font-size: 20px;
      line-height: 20px;
      color: #696875;
    }
  }
  &__content {
    text-align: justify;
    word-break: break-all;
  }
}

/** experience */

.section-image {
  &__main {
    width: 100%;
    height: 450px;
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
}
</style>
