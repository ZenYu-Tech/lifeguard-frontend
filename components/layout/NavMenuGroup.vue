<template>
  <div ref="navMenuGroup" class="nav-menu-group">
    <NavMenu
      v-for="(menu, index) in menuList"
      :key="menu.title"
      :menu="menu"
      :index="index"
      :active-index="activeIndex"
      @mouseover.native="activeIndex = index"
      @click.native="activeIndex = -1"
    />
  </div>
</template>

<script>
export default {
  name: 'NavMenuGroup',
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIndex: -1
    }
  },
  watch: {
    activeIndex() {
      function captureClickOutsdie(e) {
        const targetElement = e.target.closest('.nav-menu-group')
        if (targetElement !== this.$refs.navMenuGroup) {
          this.activeIndex = -1
          document.onmouseover = null
        }
      }

      if (this.activeIndex !== -1) {
        document.onmouseover = captureClickOutsdie.bind(this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu-group {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  column-gap: 40px;
  margin-top: 8px;
}
</style>
