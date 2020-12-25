<template>
  <div class="side-menu" @click.stop>
    <div class="side-menu__title">
      <h4>{{ title }}</h4>
      <i :style="{ 'mask-image': `url(${require('@/assets/icons/cross.svg')})` }" @click="$emit('collapse')"></i>
    </div>
    <div class="side-menu__link-section">
      <div v-for="menu in menuList" :key="menu.title" class="link-section">
        <h5 class="link-section__title">{{ menu.title }}</h5>
        <template v-if="menu.subMenuList.length > 0">
          <ul class="link-section__link-group">
            <li v-for="subMenu in menu.subMenuList" :key="subMenu.title">{{ subMenu.title }}</li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    title: {
      type: String,
      required: true
    },
    menuList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 345px;
  background: rgba(66, 132, 247, 0.8);
  backdrop-filter: blur(4px);
  padding: 14px 32px;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    h4 {
      font-size: 20px;
      color: white;
      font-weight: 300;
    }
    i {
      display: block;
      width: 20px;
      height: 20px;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: white;
    }
  }
  &__link-section {
    display: grid;
    row-gap: 17px;
  }
}

.link-section {
  &__title {
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    color: white;
  }
  &__link-group {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 38px;
    grid-auto-flow: row;
    row-gap: 9px;
    > li {
      display: flex;
      align-items: center;
      padding: 4px 11px;
      color: white;
      font-weight: 300;
      font-size: 20px;
      background: rgba(49, 93, 165, 0.9);
      height: 100%;
    }
  }
}
</style>
