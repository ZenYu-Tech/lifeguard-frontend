<template>
  <div class="nav-menu" :class="{ expand: isExpand }">
    <div class="nav-menu__item">
      <span>{{ menu.title }}</span>
      <i
        v-if="!haveNoSubMenu"
        class="icon-svg"
        :style="{ 'mask-image': `url(${require('@/assets/icons/chevron-up.svg')})` }"
      ></i>
    </div>
    <ul v-if="!haveNoSubMenu && isExpand" class="nav-menu__dropdown">
      <li v-for="subMenu in menu.subMenuList" :key="subMenu.title">
        <span>{{ subMenu.title }}</span>
        <i
          v-if="subMenu.action === 'download'"
          class="icon-svg"
          :style="{ 'mask-image': `url(${require('@/assets/icons/download.svg')})` }"
        ></i>
        <i
          v-else-if="subMenu.action === 'external-link'"
          class="icon-svg"
          :style="{ 'mask-image': `url(${require('@/assets/icons/external-link.svg')})` }"
        ></i>
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
    &:hover {
      span {
        color: map-get($colors, primary);
      }
      i {
        background-color: map-get($colors, primary) !important;
      }
    }
    span {
      font-weight: 300;
      font-size: 20px;
      line-height: 29px;
      margin-right: 3px;
    }
    i.icon-svg {
      background-color: black;
      transform: rotate(180deg);
      transition: all 0.3s;
    }
  }

  &__dropdown {
    width: max-content;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 100%;
    margin-top: 11px;
    > li {
      padding: 8px 18px;
      display: flex;
      align-items: center;
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

  &.expand {
    .nav-menu__item {
      i {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
