<template>
  <div :style="style">
    <vue-slick-carousel v-bind="options">
      <slot></slot>
    </vue-slick-carousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'SlickCarousel',
  components: {
    VueSlickCarousel
  },
  props: {
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    style() {
      return {
        width: this.convertToUnit(this.width),
        height: this.convertToUnit(this.height)
      }
    }
  },
  methods: {
    convertToUnit(str, unit = 'px') {
      if (str == null || str === '') {
        return undefined
      } else if (isNaN(str)) {
        return String(str)
      } else {
        return `${Number(str)}${unit}`
      }
    }
  }
}
</script>
