<template>
  <div class="side-menu" @click.stop @scroll.stop>
    <div class="side-menu__title">
      <h4>{{ title }}</h4>
      <i
        class="icon-svg"
        :style="{ 'mask-image': `url(${require('@/assets/icons/cross.svg')})` }"
        @click="$emit('collapse')"
      ></i>
    </div>
    <div class="side-menu__link-section">
      <div v-for="menu in menuList" :key="menu.title" class="link-section">
        <template v-if="menu.subMenuList.length > 0">
          <h5 class="link-section__title">{{ menu.title }}</h5>
          <ul class="link-section__link-group">
            <template v-for="subMenu in menu.subMenuList">
              <nuxt-link v-if="subMenu.action === 'internal-link'" :key="subMenu.title" tag="li" :to="subMenu.link">
                {{ subMenu.title }}
              </nuxt-link>
              <li v-else :key="subMenu.title">{{ subMenu.title }}</li>
            </template>
          </ul>
        </template>
        <template v-else>
          <nuxt-link v-if="menu.action === 'internal-link'" tag="h5" :to="menu.link" class="link-section__title">
            {{ menu.title }}
          </nuxt-link>
          <h5 v-else class="link-section__title">{{ menu.title }}</h5>
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

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px auto;
  row-gap: 15px;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 20px;
      color: white;
    }
    i.icon-svg {
      background-color: white;
    }
  }
  &__link-section {
    display: grid;
    row-gap: 17px;
    grid-auto-rows: min-content;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
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
      font-size: 20px;
      background: rgba(49, 93, 165, 0.9);
      height: 100%;
    }
  }
}
</style>
