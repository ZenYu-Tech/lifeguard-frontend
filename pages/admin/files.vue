<template>
  <div class="admin-container" v-loading="loading">
    <el-row :gutter="30">
      <el-col :span="3">
        <files-nav :files-nav="filesNav" :active-nav.sync="activeNav"></files-nav>
      </el-col>

      <el-col :span="10" class="files-upload">
        <div class="files-upload__title">上傳{{ areaTitle }}</div>
        <template v-if="activeNav === 'registration'">
          <el-row v-for="item in multiInputGroup" :key="item.label" class="files-upload__item">
            <div class="files-upload__label">{{ item.label }}</div>
            <div>
              <div>
                <label :for="item.label" class="el-button el-button--primary el-button--small"
                  >選擇檔案
                  <input
                    :id="item.label"
                    type="file"
                    :accept="item.accept"
                    style="display: none"
                    @change="handleUpload($event, item.label)"
                  />
                </label>
                <el-button type="success" size="small" :disabled="!item.changed" @click="handleSubmit(item)"
                  >確定上傳</el-button
                >
                <el-button
                  v-if="item.changed"
                  size="small"
                  type="danger"
                  icon="el-icon-refresh-left"
                  @click="cancelUpdate(item)"
                  >取消</el-button
                >
              </div>
              <div class="files-upload__placeholder">
                <div v-if="!item.title">尚未選擇任何檔案</div>
                <div v-else>{{ item.title }}</div>
              </div>
            </div>
          </el-row>
        </template>

        <template v-else>
          <!-- <el-input v-model="fileData.title" placeholder="請輸入" style="margin-bottom: 20px">
            <template slot="prepend">檔名</template>
          </el-input> -->
          <label for="file" class="el-button el-button--primary"
            >選擇檔案
            <input id="file" type="file" accept=".pdf" style="display: none" @change="handleUpload($event)" />
          </label>
          <el-button type="success" :disabled="!fileData.changed" @click="handleSubmit(fileData)">確認上傳</el-button>

          <div class="files-upload__placeholder">
            <div v-if="!fileData.title">尚未選擇任何檔案</div>
            <div v-else>{{ fileData.title }}</div>
          </div>
        </template>
      </el-col>

      <el-col v-if="activeNav === 'certification'" :span="11">
        <files-table :table-data="tableData" @handleDeleteFile="handleDeleteFile"></files-table>
        <div style="text-align: center; margin-top: 20px">
          <pagination
            :page="getPagination.page"
            :count="getPagination.count"
            :total="getPagination.totalCount"
            @jump="jump"
            @change-size="changeSize"
          ></pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Files',
  layout: 'admin',
  async asyncData({ store }) {
    await store.dispatch('admin/file/fetchFiles', { category: 'registration', count: '', page: '' })
  },
  data() {
    return {
      filesNav: [
        { id: 'registration', name: '報名表' },
        { id: 'certification', name: '通過名單' },
        { id: 'training', name: '訓練講義' },
        { id: 'plan', name: '實施計畫' }
      ],
      activeNav: 'registration',
      fileData: {
        fileId: '',
        category: '',
        title: '',
        accept: '.pdf',
        label: '',
        url: '',
        changed: false
      },
      multiInputGroup: [],
      loading: false
    }
  },
  computed: {
    areaTitle() {
      return this.filesNav.find(nav => nav.id === this.activeNav).name
    },
    ...mapGetters('admin', {
      getFilesByCategory: 'file/getFilesByCategory',
      getPagination: 'file/getPagination'
    }),
    tableData() {
      return this.getFilesByCategory('certification')
    }
  },
  watch: {
    activeNav: {
      immediate: true,
      handler(newValue) {
        this.changeNav(newValue)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchFiles: 'admin/file/fetchFiles',
      createFile: 'admin/file/createFile',
      editFile: 'admin/file/editFile',
      deleteFile: 'admin/file/deleteFile'
    }),
    findMatchFile() {
      this.multiInputGroup = this.getFilesByCategory(this.activeNav).map(file => {
        const type = file.url.split('.')[1]
        return { ...file, accept: `.${type}`, label: type.toUpperCase(), changed: false }
      })
    },
    async changeNav(category) {
      this.loading = true
      await this.fetchFiles({ category, count: 10, page: 1 })
      this.resetFileData(category)
      this.loading = false
    },
    handleUpload(e, label) {
      const file = e.target.files[0]
      if (!label) {
        this.fileData = Object.assign(this.fileData, { title: file.name, fileObj: file, changed: true })
      } else {
        this.multiInputGroup.forEach(input => {
          if (input.label === label) {
            input = Object.assign(input, { title: file.name, fileObj: file, changed: true })
          }
        })
      }
    },
    async handleSubmit(item) {
      const { category, fileId, title } = item
      if (item.fileId) {
        await this.editFile({ category, fileId, title, file: item.fileObj })
      } else {
        await this.createFile({ category, title, file: item.fileObj })
      }
      this.changeNav(category)
    },
    cancelUpdate(item) {
      item.changed = false
      document.getElementById(item.label).value = null
      this.changeNav(this.activeNav)
    },
    resetFileData(category) {
      if (category === 'registration') {
        return this.findMatchFile()
      } else if (category === 'certification') {
        return this.initFileData(category)
      } else if (this.getFilesByCategory(category).length !== 0) {
        this.fileData = JSON.parse(JSON.stringify(this.getFilesByCategory(category)[0]))
      } else {
        this.initFileData(category)
      }
    },
    initFileData(category) {
      this.fileData = Object.assign(this.fileData, {
        fileId: '',
        category,
        title: '',
        accept: '.pdf',
        label: '',
        url: '',
        changed: false
      })
    },
    async jump(page) {
      this.loading = true
      await this.fetchFiles({ category: 'certification', count: this.getPagination.count, page })
      this.loading = false
    },
    async changeSize(count) {
      this.loading = true
      await this.fetchFiles({ category: 'certification', count, page: 1 })
      this.loading = false
    },
    async handleDeleteFile(target) {
      try {
        const result = await this.$confirm(`確定要刪除「${target.title}」這個檔案嗎？`, '確認刪除', {
          confirmButtonText: '確認',
          cancelButtonText: '返回',
          type: 'warning'
        })

        if (result === 'cancel') {
          return
        }
        await this.deleteFile({ category: target.category, fileId: target.fileId })
        const { count, page } = this.getPagination
        await this.fetchFiles({ category: 'certification', count, page })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col:not(:first-child) {
  border-left: 6px solid #f1f1f1;
}

.files-upload {
  &__item {
    display: flex;
    margin-bottom: 16px;
  }
  &__label {
    font-size: 20px;
    color: #4a4a4a;
    width: 60px;
  }
  &__title {
    font-size: 20px;
    color: #4a4a4a;
    margin-bottom: 18px;
  }
  &__placeholder {
    font-size: 16px;
    color: #4a4a4a;
    margin: 10px 0 20px;
  }
}
</style>
