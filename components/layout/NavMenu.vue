<template>
  <div class="nav-menu" :class="{ expand: isExpand }">
    <div class="nav-menu__item">
      <span>{{ menu.title }}</span>
      <i v-if="!haveNoSubMenu" :style="{ 'mask-image': `url(${require('@/assets/icons/chevron-up.svg')})` }"></i>
    </div>
    <ul v-if="!haveNoSubMenu && isExpand" class="nav-menu__dropdown">
      <li v-for="subMenu in menu.subMenuList" :key="subMenu.title">
        <span>{{ subMenu.title }}</span>
        <i v-if="subMenu.action === 'download'" class="icon icon-download"></i>
        <i v-else-if="subMenu.action === 'external-link'" class="icon icon-external"></i>
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
        color: #4284f7;
      }
      i {
        background-color: #4284f7;
      }
    }
    span {
      font-weight: 300;
      font-size: 20px;
      line-height: 29px;
      margin-right: 3px;
    }
    i {
      width: 20px;
      height: 20px;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: black;
      transform: rotate(180deg);
      transition: all 0.3s;
    }
  }

  &__dropdown {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    width: max-content;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 100%;
    margin-top: 11px;
    > li {
      padding: 8px 20px;

      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        &-download {
          background-image: url('~@/assets/icons/download.svg');
        }
        &-external {
          background-image: url('~@/assets/icons/external-link.svg');
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
