<template>
  <button v-if="isScrolled" @click="backToTop">
    <img src="@/assets/images/top.png" alt="" />
  </button>
</template>
<script>
export default {
  data() {
    return {
      isScrolled: false
    }
  },
  created() {
    if (process.client) {
      window.onscroll = () => {
        this.handleScroll()
      }
    }
  },
  methods: {
    handleScroll() {
      if (process.client) {
        this.isScrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
      }
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 30px;
  right: 20px;
  background: transparent;
  border: none;
  width: 50px;
  height: 50px;
  padding: 0;
  outline: 0;
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>