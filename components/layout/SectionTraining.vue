<template>
  <section class="training">
    <h3 class="training__title">訓練影片</h3>
    <card-video v-for="video in videos" :key="video.id" :video="video"></card-video>
  </section>
</template>

<script>
export default {
  name: 'SectionTraining',
  props: {
    videos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.training {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  row-gap: 30px;

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

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'title title'
      'video1 video2';
    row-gap: 23px;
    column-gap: 30px;
    & > :nth-child(2) {
      grid-area: video1;
    }
    & > :nth-child(3) {
      grid-area: video2;
    }

    &__title {
      justify-self: start;
      grid-area: title;
      font-size: 40px;
      line-height: 40px;
      &:before {
        width: 50px;
        height: 50px;
        top: -20px;
        left: -20px;
      }
    }
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr 1fr;
    grid-template-areas:
      'title'
      'video1'
      'video2';
    height: min-content;
  }
}
</style>
