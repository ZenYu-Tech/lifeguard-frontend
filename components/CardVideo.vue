<template>
  <div>
    <iframe
      width="100%"
      height="206"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :src="video.videoUrl"
    ></iframe>
    <div>
      <h6 class="video__title">{{ video.title }}</h6>
      <time class="video__upload-time">上傳時間 {{ dateFormator(video.createdAt) }}</time>
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
  methods: {
    dateFormator(date) {
      return new Date(date).toISOString().slice(0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  &__title {
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 30px;
  }
  &__upload-time {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
