<template>
  <div>
    <div v-html="embedIframe"></div>
    <div>
      <h6 class="video__title">{{ video.title }}</h6>
      <time class="video__upload-time">上傳時間 {{ $formatDate(video.createdAt) }}</time>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardVideo',
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      embedIframe: ''
    }
  },
  created() {
    this.resizeIframe(this.embedIframe)
  },
  methods: {
    resizeIframe(iframe) {
      this.embedIframe = this.video.embedIframe
      this.embedIframe = this.embedIframe.replace(/width="[0-9]*"/m, 'width="100%"')
      this.embedIframe = this.embedIframe.replace(/height="[0-9]*"/m, 'height="216px"')
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  &__title {
    font-size: 24px;
    line-height: 30px;
  }
  &__upload-time {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
