<template>
  <footer class="footer">
    <div class="footer__link-section max-width">
      <div v-for="menu in menuList" :key="menu.title" class="link-section">
        <h5 class="link-section__title">{{ menu.title }}</h5>
        <template v-if="menu.subMenuList.length > 0">
          <ul class="link-section__link-group">
            <li v-for="(subMenu, subIndex) in menu.subMenuList" :key="subMenu.title">
              <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">
                {{ subMenu.title }}
              </nuxt-link>
              <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
                {{ subMenu.title }}
                <i class="el-icon-link"></i>
              </a>
              <a v-else @click="download(subMenu.action, subIndex)"
                >{{ subMenu.title }}<i class="el-icon-download"></i
              ></a>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div class="footer__divider max-width"></div>
    <div class="footer__contact max-width">
      <div>
        <h6>
          <span>西灣學院</span>
          <span>運動與健康教育中心</span>
        </h6>
        <p>聯絡電話 07-525-2000 #5865</p>
        <p>地址 80424 高雄市鼓山區蓮海路70號</p>
      </div>
      <div>
        <p>Copyright &#169; 2021 沉於科技工作室</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
              title: '課程資料',
              action: 'download-training'
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
                'https://isports.sa.gov.tw/apps/FDownload.aspx?SYS=LGM&MENU_CD=M10&ITEM_CD=T07&MENU_PRG_CD=3&ITEM_PRG_CD=3'
            },
            {
              title: '實施計畫',
              action: 'download-plan'
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
        }
      ]
    }
  },
  computed: {
    ...mapGetters('client', {
      getHeaderFiles: 'file/getHeaderFiles'
    })
  },
  methods: {
    ...mapActions('client', {
      downloadFile: 'file/downloadFile'
    }),
    download(action, index) {
      const category = action.split('-')[1]
      const file = this.getHeaderFiles.find(file => {
        if (category === 'registration') {
          const extensionList = ['pdf', 'doc', 'odt']
          return file.category === category && file.extension === extensionList[index]
        } else {
          return file.category === category
        }
      })
      this.downloadFile({ fileId: file.fileId })
    }
  }
}
</script>

<style lang="scss" scoped>
$color-title: #ffffff;
$color-content: rgba(255, 255, 255, 0.4);

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
        color: $color-title;
        margin-bottom: 10px;
        span {
          display: block;
        }
      }
      p {
        font-size: 16px;
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
    list-style-type: none;

    > li > a {
      color: $color-content;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;

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
