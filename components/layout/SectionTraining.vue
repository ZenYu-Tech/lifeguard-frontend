<template>
  <section class="training">
    <h3 class="training__title">訓練影片</h3>
    <div class="training__wrapper">
      <card-video v-for="video in videos" :key="video.id" :video="video"></card-video>
    </div>
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
  grid-template-rows: 40px auto;
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
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    row-gap: 30px;
    height: min-content;
  }

  @media (min-width: 768px) {
    &__title {
      justify-self: start;
      font-size: 40px;
      line-height: 40px;
      &:before {
        width: 50px;
        height: 50px;
        top: -20px;
        left: -20px;
      }
    }
    &__wrapper {
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;
    }
  }
  @media (min-width: 1200px) {
    &__wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>
