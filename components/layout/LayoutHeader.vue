<template>
  <header class="header" :class="{ 'side-menu-expand': isSideMenuExpand }">
    <nuxt-link tag="div" to="/" class="header__logo">
      <img src="@/assets/images/logo.png" alt="西灣學院" />
    </nuxt-link>
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
      <div class="header__external-link">
        <a href="https://siwan.nsysu.edu.tw/" target="_blank">
          西灣學院
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/external-link.svg')})` }"></i>
        </a>
        <a href="https://www.nsysu.edu.tw/ " target="_blank">
          國立中山大學
          <i class="icon-svg" :style="{ 'mask-image': `url(${require('@/assets/icons/external-link.svg')})` }"></i>
        </a>
      </div>
      <NavMenuGroup :menu-list="menuList" />
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
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
              title: '活動消息',
              action: 'internal-link',
              link: '/news'
            },
            {
              title: '檢定公告',
              action: 'external-link',
              link: 'https://isports.sa.gov.tw/apps/LGM/LGM09/LGM0966Q_01V1.aspx?MENU_PRG_CD=3&ITEM_PRG_CD=2'
            },
            {
              title: '徵才資訊',
              action: 'external-link',
              link: 'https://isports.sa.gov.tw/Apps/FessayList.aspx?SYS=LGM&MENU_CD=M10&ITEM_CD=T02&MENU_PRG_CD=2'
            }
          ]
        },
        {
          title: '報名',
          subMenuList: [
            {
              title: '下載 PDF',
              action: 'download-registration'
            },
            {
              title: '下載 DOC',
              action: 'download-registration'
            },
            {
              title: '下載 ODT',
              action: 'download-registration'
            }
          ]
        },
        {
          title: '訓練專區',
          subMenuList: [
            {
              title: '實施計畫',
              action: 'download-plan'
            },
            {
              title: '課程資料',
              action: 'download-training'
            },
            {
              title: '教學影片',
              action: 'internal-link',
              link: '/training'
            },
            {
              title: '題庫',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/apps/FDownload.aspx?SYS=LGM&MENU_CD=M10&ITEM_CD=T07&MENU_PRG_CD=3&ITEM_PRG_CD=3'
            }
          ]
        },
        {
          title: '檢定專區',
          subMenuList: [
            {
              title: '相關法規',
              action: 'external-link',
              link: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0120054'
            },
            {
              title: '相關表格',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/apps/FDownload.aspx?SYS=LGM&MENU_CD=M10&ITEM_CD=T11&MENU_PRG_CD=8&ITEM_PRG_CD=1'
            },
            {
              title: '檢定報名Q&A',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/apps/QaList.aspx?SYS=LGM&MENU_CD=M10&ITEM_CD=T05&MENU_PRG_CD=3&ITEM_PRG_CD=7'
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
          subMenuList: [],
          action: 'internal-link',
          link: '/experience'
        },
        {
          title: '相關網站',
          subMenuList: [
            {
              title: 'i 運動平台',
              action: 'external-link',
              link: 'https://isports.sa.gov.tw/Index.aspx'
            }
          ]
        }
      ]
    }
  },
  async created() {
    await this.fetchHeaderFiles()
  },
  methods: {
    ...mapActions('client', {
      fetchHeaderFiles: 'file/fetchHeaderFiles'
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10000;
  top: 0px;
  left: 0px;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0px 18px 0px 24px;
  transition: all 0.3s ease;
  &__logo {
    width: 50px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  &__menu {
    width: 25px;
    height: 25px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.side-menu-expand {
    height: 0px;
    > div {
      height: 80px;
    }
  }

  @media (min-width: 768px) {
    height: 70px;
    padding: 0 40px;
    &__logo {
      width: 85px;
    }

    &__menu {
      width: 40px;
      height: 40px;
    }
  }
  @media (min-width: 1200px) {
    height: 90px;
    &__menu {
      width: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
    }
    &__external-link {
      display: grid;
      grid-template-columns: repeat(2, auto);
      column-gap: 15px;
      margin-top: 3px;
      > a {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #2b2b2b;
        i.icon-svg {
          width: 18px;
          height: 18px;
          margin-left: 4px;
          background-color: #2b2b2b;
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
