<template>
  <div class="admin-container">
    <el-row :gutter="30">
      <el-col :span="3">
        <files-nav :files-nav="filesNav" :active-nav="activeNav" @change-nav="changeNav"></files-nav>
      </el-col>

      <el-col :span="10" class="files-upload">
        <div class="files-upload__title">上傳{{ areaTitle }}</div>
        <template v-if="allowMultiInput">
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
                <div v-if="!item.title && !item.newFile">尚未選擇任何檔案</div>
                <div v-else>
                  <template v-if="item.changed">
                    {{ item.newFile }}
                  </template>
                  <template v-else>
                    {{ item.title }}
                  </template>
                </div>
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
            <div v-if="!fileData.title && !fileData.newFile">尚未選擇任何檔案</div>
            <div v-else>
              <template v-if="fileData.changed">
                {{ fileData.newFile }}
              </template>
              <template v-else>
                {{ fileData.title }}
              </template>
            </div>
          </div>
        </template>
      </el-col>

      <el-col v-if="showTable" :span="11">
        <files-table :table-data="tableData"></files-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FilesTable from '@/components/admin/files/FilesTable'
import FilesNav from '@/components/admin/files/FilesNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Files',
  layout: 'admin',
  components: { FilesTable, FilesNav },
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
      showTable: false,
      allowMultiInput: true,
      tableData: [],
      multiInputGroup: []
    }
  },
  computed: {
    areaTitle() {
      return this.filesNav.filter(nav => nav.id === this.activeNav)[0].name
    },
    ...mapGetters('admin', {
      getFilesByCategory: 'file/getFilesByCategory'
    })
  },
  watch: {
    activeNav(currentNav) {
      this.allowMultiInput = false
      this.showTable = false
      this.fileData = {
        fileId: '',
        category: '',
        title: '',
        accept: '.pdf',
        label: '',
        url: '',
        changed: false
      }

      switch (currentNav) {
        case 'registration':
          this.allowMultiInput = true
          break
        case 'certification':
          this.showTable = true
          break
      }
    }
  },
  created() {
    this.findMatchFile()
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
        let type = file.url.split('.')[1]
        return { ...file, accept: `.${type}`, label: type.toUpperCase(), changed: false }
      })
    },
    async changeNav(navId) {
      if (this.activeNav !== navId) this.activeNav = navId
      await this.fetchFiles({ category: this.activeNav, count: '', page: '' })

      if (this.activeNav === 'registration') {
        this.findMatchFile()
      } else if (this.activeNav === 'certification') {
        this.tableData = this.getFilesByCategory(this.activeNav)
        this.fileData.category = 'certification'
      } else {
        this.fileData = this.getFilesByCategory(this.activeNav)[0]
      }
    },
    handleUpload(e, label) {
      const file = e.target.files[0]
      if (!label) {
        this.fileData = Object.assign(this.fileData, { newFile: file.name, fileObj: file, changed: true })
      } else {
        this.multiInputGroup.forEach(input => {
          if (input.label === label) {
            input = Object.assign(input, { newFile: file.name, fileObj: file, changed: true })
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
    },
    cancelUpdate(item) {
      item.changed = false
      item.newFile = ''
      document.getElementById(item.label).value = null
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
    font-weight: bold;
    font-size: 20px;
    color: #4a4a4a;
    width: 60px;
  }
  &__title {
    font-weight: bold;
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
