<template>
  <el-dialog title="預覽" :visible.sync="dialogVisible" width="70%" :show-close="false" :close-on-click-modal="false">
    <section v-if="articleContent.category === 'experience'" class="section-image">
      <div
        class="section-image__main"
        :style="{ 'background-image': `url(${getCarouselImage[activeSlideIndex]})` }"
      ></div>
      <slick-carousel
        v-if="getCarouselImage.length > 0"
        :style="carosuelStyle"
        :options="slickOptions"
        @update:activeSlideIndex="activeSlideIndex = $event"
        class="section-image__carousel"
      >
        <div
          v-for="(image, index) in getCarouselImage"
          :key="index"
          class="section-image__carousel-image"
          :style="carosuelStyle"
        >
          <img :src="`${image}`" :alt="`圖片${index}`" />
        </div>
      </slick-carousel>
    </section>
    <div class="article__header">
      <h4>{{ articleContent.title }}</h4>
      <time>{{ $formatDate(new Date(), true) }}</time>
    </div>
    <div class="article__content">
      <div v-html="articleContent.content"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">關閉</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InnerArticlePreview',
  props: {
    articleContent: { type: Object, required: true },
    dialogVisible: { type: Boolean, required: true },
    newAddPreviewImages: { type: Array, required: true }
  },
  data() {
    return {
      slickOptions: {
        focusOnSelect: true,
        arrows: false,
        slidesToShow: 5,
        autoplay: true,
        swipe: false
      },
      activeSlideIndex: 0
    }
  },
  created() {
    this.$nuxt.$on('slideChange', value => {
      this.activeSlideIndex = value
    })
  },
  computed: {
    ...mapGetters({
      getCurrentDevice: 'helper/getCurrentDevice'
    }),
    getCarouselImage() {
      const result = []
      this.articleContent.images.forEach(image => {
        result.push(`data:image/png;base64,${image.image}`)
      })
      this.newAddPreviewImages.forEach(image => {
        result.push(image)
      })
      return result
    },
    carosuelStyle() {
      return {
        height: this.getCurrentDevice === 'desktop' ? '120px' : '80px'
      }
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
  &__header {
    h4 {
      font-size: 28px;
    }
    time {
      font-size: 18px;
      color: #696875;
    }
  }
  &__content {
    text-align: justify;
    word-break: break-all;
    margin: 30px 0;
    font-size: 16px;
  }
}

/** experience */

.section-image {
  height: 600px;
  margin-bottom: 30px;
  &__main {
    width: 100%;
    height: 450px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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
      background-position: center;
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
