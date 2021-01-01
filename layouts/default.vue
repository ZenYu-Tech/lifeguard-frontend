<template>
  <div>
    <LayoutHeader />
    <section
      v-if="haveBanner"
      class="banner"
      :style="{ 'background-image': `url(${require('@/assets/images/banner.png')})` }"
    ></section>
    <Nuxt />
    <LayoutFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      haveBanner: 'helper/getHaveBanner'
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 667px;
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
}
</style>
