<template>
  <div class="side-menu" @click.stop @scroll.stop>
    <div class="side-menu__title">
      <div class="side-menu__header">
        <a href="https://siwan.nsysu.edu.tw/" target="_blank" style="margin-right: 10px">
          西灣學院
          <i class="el-icon-link"></i>
        </a>
        <a href="https://www.nsysu.edu.tw/ " target="_blank">
          國立中山大學
          <i class="el-icon-link"></i>
        </a>
      </div>
      <i class="el-icon-close" @click="$emit('collapse')"></i>
    </div>
    <div class="side-menu__link-section">
      <div v-for="menu in menuList" :key="menu.title" class="link-section">
        <template v-if="menu.subMenuList.length > 0">
          <h5 class="link-section__title">{{ menu.title }}</h5>
          <ul class="link-section__link-group">
            <li v-for="(subMenu, index) in menu.subMenuList" :key="subMenu.title" @click="$emit('collapse')">
              <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">
                {{ subMenu.title }}
              </nuxt-link>
              <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
                {{ subMenu.title }}
                <i class="el-icon-link"></i>
              </a>
              <a v-else @click="download(subMenu.action, index)">{{ subMenu.title }}<i class="el-icon-download"></i></a>
            </li>
          </ul>
        </template>
        <template v-else>
          <nuxt-link
            v-if="menu.action === 'internal-link'"
            tag="h5"
            :to="menu.link"
            class="link-section__title"
            @click.native="$emit('collapse')"
          >
            {{ menu.title }}
          </nuxt-link>
          <h5 v-else class="link-section__title">{{ menu.title }}</h5>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SideMenu',
  props: {
    menuList: {
      type: Array,
      required: true
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
.side-menu {
  position: fixed;
  z-index: 100;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 315px;
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
    color: white;
    .el-icon-close {
      font-size: 22px;
    }
  }
  &__header {
    font-size: 15px;
    a {
      // color: white;
      i {
        font-size: 14px;
        padding: 0;
      }
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
    font-size: 20px;
    margin-bottom: 5px;
    color: white;
  }
  &__link-group {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 38px;
    grid-auto-flow: row;
    row-gap: 12px;
    > li > a {
      background: rgba(49, 93, 165, 0.5);
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 100%;
      padding: 4px 11px;
      width: 100%;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
