<template>
  <div class="admin-container">
    <el-row :gutter="30">
      <el-col :span="3">
        <files-nav :files-nav="filesNav" :active-nav="activeNav" @change-nav="changeNav"></files-nav>
      </el-col>

      <el-col :span="7" class="files-upload">
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
                <el-button type="success" size="small" :disabled="!item.changed" @click="handleSubmit"
                  >確定上傳</el-button
                >
              </div>
              <div class="files-upload__placeholder">
                <div v-if="!item.file">尚未選擇任何檔案</div>
                <div v-else>
                  {{ item.file.name }}
                </div>
              </div>
            </div>
          </el-row>
        </template>

        <template v-else>
          <el-input v-model="fileData.title" placeholder="請輸入" style="margin-bottom: 20px">
            <template slot="prepend">檔名</template>
          </el-input>
          <label for="file" class="el-button el-button--primary"
            >選擇檔案
            <input id="file" type="file" accept=".pdf" style="display: none" @change="handleUpload($event)" />
          </label>

          <div class="files-upload__placeholder">
            <div v-if="fileData.title.length < 1">尚未選擇任何檔案</div>
            <div v-else>
              {{ fileData.title }}
            </div>
          </div>
          <el-button type="success" :disabled="!fileData.changed" @click="handleSubmit">確認上傳</el-button>
        </template>
      </el-col>

      <el-col v-if="showTable" :span="14">
        <files-table :table-data="tableData"></files-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FilesTable from '@/components/admin/files/FilesTable'
import FilesNav from '@/components/admin/files/FilesNav'

const certificationData = [
  { title: '109年第一梯次檢定通過名單', url: '109年第一梯次檢定通過名單.pdf', created_time: '2021-03-24' },
  { title: '109年第一梯次檢定通過名單', url: '109年第一梯次檢定通過名單.pdf', created_time: '2021-03-24' },
  { title: '109年第一梯次檢定通過名單', url: '109年第一梯次檢定通過名單.pdf', created_time: '2021-03-24' }
]

export default {
  name: 'Files',
  layout: 'admin',
  components: { FilesTable, FilesNav },
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
        title: '',
        file: '',
        changed: false
      },
      showTable: false,
      allowMultiInput: false,
      tableData: [],
      multiInputGroup: [
        { label: 'PDF', accept: '.pdf', file: '', changed: false },
        { label: 'DOC', accept: '.doc', file: '', changed: false },
        { label: 'ODT', accept: '.odt', file: '', changed: false }
      ]
    }
  },
  computed: {
    areaTitle() {
      return this.filesNav.filter(nav => nav.id === this.activeNav)[0].name
    }
  },
  watch: {
    activeNav(currentNav) {
      this.allowMultiInput = false
      this.showTable = false
      switch (currentNav) {
        case 'registration':
          this.allowMultiInput = true
          break
        case 'certification':
          this.showTable = true
          break
      }
    }
    // fileData() {
    //   if (this.fileData.title.length > 0) {
    //     this.fileData.changed = true
    //   }
    // }
  },
  created() {
    this.tableData = certificationData
  },
  methods: {
    changeNav(navId) {
      if (this.activeNav !== navId) this.activeNav = navId
    },
    handleUpload(e, label) {
      const file = e.target.files[0]
      if (!label) {
        this.fileData = Object.assign(this.fileData, { title: file.name, file, changed: true })
      } else {
        this.multiInputGroup.forEach(input => {
          if (input.label === label) {
            input = Object.assign(input, { file, changed: true })
          }
        })
      }
    },
    handleSubmit() {
      // submit change
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
