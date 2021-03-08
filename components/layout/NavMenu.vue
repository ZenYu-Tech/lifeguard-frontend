<template>
  <div class="nav-menu" :class="{ expand: isExpand }">
    <div class="nav-menu__item">
      <template v-if="haveNoSubMenu">
        <nuxt-link v-if="menu.action === 'internal-link'" tag="span" :to="menu.link">{{ menu.title }}</nuxt-link>
        <span v-else>{{ menu.title }}</span>
      </template>
      <template v-else>
        <span>{{ menu.title }}</span>
        <i class="el-icon-arrow-up hover-rotate"></i>
      </template>
    </div>
    <ul v-if="!haveNoSubMenu && isExpand" class="nav-menu__dropdown">
      <li v-for="(subMenu, subIndex) in menu.subMenuList" :key="subMenu.title">
        <nuxt-link v-if="subMenu.action === 'internal-link'" :to="subMenu.link">{{ subMenu.title }}</nuxt-link>
        <a v-else-if="subMenu.action === 'external-link'" :href="subMenu.link" target="_blank">
          {{ subMenu.title }}
          <i class="el-icon-link"></i>
        </a>
        <a v-else @click="download(subMenu.action, subIndex)">
          {{ subMenu.title }}
          <i class="el-icon-download"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

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
    ...mapGetters('client', {
      getHeaderFiles: 'file/getHeaderFiles'
    }),
    isExpand() {
      return this.index === this.activeIndex
    },
    haveNoSubMenu() {
      return this.menu.subMenuList.length === 0
    }
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
      color: #2b2b2b;
      padding: 10px 0;
    }
    i.hover-rotate {
      transform: rotate(180deg);
      transition: all 0.3s;
    }
    &:hover {
      span,
      i {
        color: map-get($colors, primary);
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
    list-style-type: none;

    > li > a {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 8px 18px;
      color: #2b2b2b;
      i.hover-rotate {
        width: 18px;
        height: 18px;
        margin-left: 4px;
      }
      &:hover {
        color: map-get($map: $colors, $key: primary);
      }
    }
  }
}
</style>
