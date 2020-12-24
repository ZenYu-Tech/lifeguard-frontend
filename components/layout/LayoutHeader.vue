<template>
  <el-row class="header" type="flex" justify="space-between" align="middle">
    <div class="header__logo">LOGO</div>
    <div
      class="header__menu hidden-lg-only"
      :style="{ 'background-image': `url(${require('@/assets/icons/menu.svg')})` }"
    ></div>
    <div class="header__menu hidden-md-and-down">
      <NavMenuGroup :menu-list="menuList" />
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
      menuList: [
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
              action: 'external-link'
            },
            {
              title: '題庫',
              action: 'outer-link'
            }
          ]
        },
        {
          title: '活動花絮',
          subMenuList: []
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  height: 65px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  width: 100vw;
  padding: 0px 18px 0px 24px;
  &__logo {
    width: 200px;
    height: 40px;
    background: rgba(66, 132, 247, 0.73);
    opacity: 0.6;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__menu {
    width: 40px;
    height: 40px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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
</style>
