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
            <li v-for="(subMenu, index) in menu.subMenuList" :key="subMenu.title" @click="$emit('collapse')">
              <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">
                {{ subMenu.title }}
              </nuxt-link>
              <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
                {{ subMenu.title }}
              </a>
              <a v-else @click="download(subMenu.action, index)">{{ subMenu.title }}</a>
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
    title: {
      type: String,
      required: true
    },
    menuList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('client', {
      getFilesByCategory: 'file/getFilesByCategory'
    })
  },
  methods: {
    ...mapActions('client', {
      downloadFile: 'file/downloadFile'
    }),
    download(action, index) {
      const category = action.split('-')[1]
      if (category === 'registration') {
        const typeList = ['.pdf', '.doc', 'odt']
        const files = this.getFilesByCategory(category)
        const file = files.find(file => file.title.includes(typeList[index]))
        this.downloadFile({ fileId: file.fileId })
      } else {
        const file = this.getFilesByCategory(category)[0]
        this.downloadFile({ fileId: file.fileId })
      }
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
    > li > a {
      background: rgba(49, 93, 165, 0.9);
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 100%;
      padding: 4px 11px;
      width: 100%;
      text-decoration: none;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
