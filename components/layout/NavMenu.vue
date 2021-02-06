<template>
  <div class="nav-menu" :class="{ expand: isExpand }">
    <div class="nav-menu__item">
      <template v-if="haveNoSubMenu">
        <nuxt-link v-if="menu.action === 'internal-link'" tag="span" :to="menu.link">{{ menu.title }}</nuxt-link>
        <span v-else>{{ menu.title }}</span>
      </template>
      <template v-else>
        <span>{{ menu.title }}</span>
        <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/chevron-up.svg')})` }"></i>
      </template>
    </div>
    <ul v-if="!haveNoSubMenu && isExpand" class="nav-menu__dropdown">
      <li v-for="subMenu in menu.subMenuList" :key="subMenu.title">
        <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">{{ subMenu.title }}</nuxt-link>
        <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
          {{ subMenu.title }}
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/external-link.svg')})` }"></i>
        </a>
        <a v-else>
          {{ subMenu.title }}
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/download.svg')})` }"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    menu: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    isExpand() {
      return this.index === this.activeIndex
    },
    haveNoSubMenu() {
      return this.menu.subMenuList.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: relative;
  display: flex;
  justify-content: center;
  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 20px;
      margin-right: 3px;
      text-decoration: none;
      color: black;
      padding: 10px 0;
    }
    i.icon-svg {
      background-color: black;
      transform: rotate(180deg);
      transition: all 0.3s;
    }
    &:hover {
      span {
        color: map-get($colors, primary);
      }
      i {
        background-color: map-get($colors, primary) !important;
      }
    }
    .expand > & {
      i {
        transform: rotate(0deg) !important;
      }
    }
  }

  &__dropdown {
    width: max-content;
    background-color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 70%;
    margin-top: 11px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 5px 5px;
    backdrop-filter: blur(4px);
    > li > a {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 8px 18px;
      text-decoration: none;
      color: black;
      i.icon-svg {
        width: 18px;
        height: 18px;
        margin-left: 4px;
        background-color: black;
      }
      &:hover {
        color: map-get($map: $colors, $key: primary);
        i.icon-svg {
          background-color: map-get($map: $colors, $key: primary) !important;
        }
      }
    }
  }
}
</style>
