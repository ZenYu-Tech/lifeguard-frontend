<template>
  <footer class="footer">
    <div class="footer__link-section">
      <div v-for="menu in menuList" :key="menu.title" class="link-section">
        <h5 class="link-section__title">{{ menu.title }}</h5>
        <template v-if="menu.subMenuList.length > 0">
          <ul class="link-section__link-group">
            <li v-for="subMenu in menu.subMenuList" :key="subMenu.title">
              <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">
                {{ subMenu.title }}
              </nuxt-link>
              <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
                {{ subMenu.title }}
              </a>
              <a v-else>{{ subMenu.title }}</a>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div class="footer__divider"></div>
    <div class="footer__contact">
      <div>
        <h6>
          <span>西灣學院</span>
          <span>運動與健康教育中心</span>
        </h6>
        <p>聯絡電話 07-525-2000 #5865</p>
        <p>地址 80424 高雄市鼓山區蓮海路70號</p>
      </div>
      <div>
        <p>Copyright@2021 沉於科技工作室</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
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
              title: '訓練講義',
              action: 'download'
            },
            {
              title: '檢定科目影片',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/Apps/TIS06/TIS0602M_01V1.aspx?MENU_CD=M10&ITEM_CD=T08&MENU_PRG_CD=23&LEFT_MENU_ACTIVE_ID=108&SUB_PRG_CD=189'
            },
            {
              title: '考試題庫',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/Apps/TIS08/TIS0801M_01V1.aspx?MENU_CD=M10&ITEM_CD=T07&MENU_PRG_CD=23&LEFT_MENU_ACTIVE_ID=108&SUB_PRG_CD=105'
            },
            {
              title: '訓練實施計畫',
              action: 'download'
            }
          ]
        },
        {
          title: '檢定專區',
          subMenuList: [
            {
              title: '相關法規',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/Apps/TIS05/TIS0501M_01V1.aspx?MENU_CD=M10&ITEM_CD=T01&MENU_PRG_CD=23&LEFT_MENU_ACTIVE_ID=107&SUB_PRG_CD=100'
            },
            {
              title: '相關表格',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/Apps/TIS08/TIS0801M_01V1.aspx?MENU_CD=M10&ITEM_CD=T11&MENU_PRG_CD=23&LEFT_MENU_ACTIVE_ID=152&SUB_PRG_CD=183'
            },
            {
              title: '檢定報名Q&A',
              action: 'external-link',
              link:
                'https://isports.sa.gov.tw/Apps/TIS05/TIS0501M_02V1.aspx?MENU_PRG_CD=23&LEFT_MENU_ACTIVE_ID=108&PKNO=1093'
            },
            {
              title: '檢定通過名單',
              action: 'internal-link',
              link: '/certification'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$color-title: #ffffff;
$color-content: rgba(255, 255, 255, 0.4);

.footer__link-section,
.footer__divider,
.footer__contact {
  max-width: 1150px;
}

.footer {
  background: rgba(0, 0, 0, 0.7);
  padding: 34px 34px 14px 34px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  justify-content: center;
  justify-items: center;
  &__link-section {
    display: grid;
    grid-auto-flow: row;
    row-gap: 25px;
  }
  &__divider {
    width: 100%;
    height: 1px;
    background-color: $color-content;
  }
  &__contact {
    text-align: center;
    color: $color-content;
    > div:nth-child(1) {
      margin-bottom: 60px;
      h6 {
        font-size: 28px;
        line-height: 1.4;
        color: $color-title;
        margin-bottom: 10px;
        span {
          display: block;
        }
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
    }
    > div:nth-child(2) {
      p {
        font-size: 12px;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 60px 45px 24px 45px;
    &__link-section {
      display: grid;
      width: 100%;
      grid-auto-flow: column;
      grid-template-columns: repeat(3, max-content);
      justify-content: space-between;
    }
    &__contact {
      width: 100%;
      > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h6 {
          font-size: 32px;
          span {
            display: inline;
          }
        }
        p {
          font-size: 20px;
        }
      }
      > div:nth-child(2) {
        display: flex;
        justify-content: center;
        p {
          font-size: 14px;
        }
      }
    }
  }
  @media (min-width: 1200px) {
    padding: 60px 97px 24px 97px;
  }
}

.link-section {
  &__title {
    font-size: 24px;
    line-height: 24px;
    color: $color-title;
    margin-bottom: 15px;
    text-align: center;
  }
  &__link-group {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    row-gap: 9px;
    justify-items: center;
    > li > a {
      color: $color-content;
      font-size: 18px;
      line-height: 18px;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: $color-title;
      }
    }
  }
  @media (min-width: 768px) {
    &__title {
      display: inline-block;
    }
    &__link-group {
      justify-items: start;
    }
  }
}
</style>
