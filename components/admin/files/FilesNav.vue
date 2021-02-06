<template>
  <ul class="files-navbar">
    <li
      v-for="nav in filesNav"
      :key="nav.id"
      :class="{ 'files-navbar__item': true, 'files-navbar__item--active': activeNav === nav.id }"
      @click="changeNav(nav.id)"
    >
      {{ nav.name }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'FilesNav',
  props: {
    filesNav: {
      type: Array,
      required: true
    },
    activeNav: {
      type: String,
      required: true
    }
  },
  methods: {
    changeNav(navId) {
      this.$emit('update:active-nav', navId)
    }
  }
}
</script>
<style lang="scss" scoped>
.files-navbar {
  &__item {
    width: 100%;
    height: 40px;
    background: rgba(0, 130, 254, 0.38);
    border-radius: 8px;
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      background: #0082fe;
    }
  }
  &__item--active {
    background: #0082fe;
  }
}
</style>
