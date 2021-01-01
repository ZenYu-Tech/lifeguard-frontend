<template>
  <header class="header" :class="{ 'side-menu-expand': isSideMenuExpand }">
    <nuxt-link tag="div" to="/" class="header__logo">LOGO</nuxt-link>
    <div
      class="header__menu hidden-lg-only"
      :style="{ 'background-image': `url(${require('@/assets/icons/menu.svg')})` }"
      @click="isSideMenuExpand = !isSideMenuExpand"
    >
      <transition name="right-to-left" mode="out-in">
        <SideMenu
          v-show="isSideMenuExpand"
          :title="'西灣學院 國立中山大學'"
          :menu-list="menuList"
          @collapse="isSideMenuExpand = false"
        />
      </transition>
    </div>
    <div class="header__menu hidden-md-and-down">
      <NavMenuGroup :menu-list="menuList" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
      isSideMenuExpand: false,
      menuList: [
        {
          title: '公告',
          subMenuList: [
            {
              title: '開課公告',
              action: 'internal-link',
              link: '/training'
            },
            {
              title: '檢定公告',
              action: 'external-link'
            },
            {
              title: '徵才資訊',
              action: 'external-link'
            }
          ]
        },
        {
          title: '報名',
          subMenuList: [
            {
              title: '下載 PDF',
              action: 'download'
            },
            {
              title: '下載 ODC',
              action: 'download'
            },
            {
              title: '下載 OTC',
              action: 'download'
            }
          ]
        },
        {
          title: '訓練專區',
          subMenuList: [
            {
              title: '訓練實施計畫',
              action: 'download'
            },
            {
              title: '講義',
              action: 'download'
            },
            {
              title: '影片',
              action: 'internal-link',
              link: '/training'
            },
            {
              title: '題庫',
              action: 'external-link'
            }
          ]
        },
        {
          title: '檢定專區',
          subMenuList: [
            {
              title: '相關法規',
              action: 'external-link'
            },
            {
              title: '相關表格',
              action: 'external-link'
            },
            {
              title: '檢定報名Q&A',
              action: 'external-link'
            },
            {
              title: '檢定通過名單',
              action: 'internal-link',
              link: '/certification'
            }
          ]
        },
        {
          title: '活動花絮',
          subMenuList: []
        },
        {
          title: '相關網站',
          subMenuList: [
            {
              title: 'i 運動平台',
              action: 'external-link'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10000;
  top: 0px;
  left: 0px;
  height: 65px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0px 18px 0px 24px;
  transition: all 0.3s ease;
  &__logo {
    width: 200px;
    height: 40px;
    background: rgba(66, 132, 247, 0.73);
    opacity: 0.6;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &__menu {
    width: 40px;
    height: 40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.side-menu-expand {
    height: 0px;
    > div {
      height: 0px;
    }
  }

  @media (min-width: 768px) {
    height: 70px;
    padding: 0px 24px 0px 40px;
    &__logo {
      width: 240px;
    }
  }
  @media (min-width: 1200px) {
    height: 90px;
    &__menu {
      width: auto;
      align-self: flex-end;
    }
  }
}

.right-to-left {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
  &-enter,
  &-leave-to {
    transform: translateX(345px);
  }
}
</style>
