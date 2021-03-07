<template>
  <div v-loading="loading" class="admin-container">
    <el-table :data="getVideos" style="width: 100%">
      <el-table-column prop="title" label="影片標題"> </el-table-column>
      <el-table-column prop="updatedAt" label="更新時間" width="150">
        <template slot-scope="{ row }">
          {{ $formatDate(row.createdAt, true) }}
        </template>
      </el-table-column>
      <el-table-column align="right" width="120">
        <template slot="header">
          <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleRead(row)">查看</el-button>
          <el-button type="text" size="small" @click="handleDelete(row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 20px">
      <pagination
        :page="getPagination.page"
        :count="getPagination.count"
        :total="getPagination.totalCount"
        @jump="jump"
        @change-size="changeSize"
      ></pagination>
    </div>
    <video-form
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :video-content="targetVideo"
      :dialog-state="dialogState"
      @change-state="changeState"
      @reset-dialog="resetDialog"
      @submitForm="submitForm"
    ></video-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Videos',
  layout: 'admin',
  async asyncData({ store }) {
    const { count, page } = store.getters['admin/article/getPagination']
    await store.dispatch('admin/video/fetchVideos', { count, page })
  },
  data() {
    return {
      dialogVisible: false,
      targetVideo: {
        title: '',
        embedIframe: ''
      },
      dialogState: '',
      loading: false,
      count: 10,
      page: 1
    }
  },
  computed: {
    ...mapGetters('admin', {
      getVideos: 'video/getVideos',
      getPagination: 'video/getPagination'
    })
  },
  methods: {
    ...mapActions({
      fetchVideos: 'admin/video/fetchVideos',
      createVideo: 'admin/video/createVideo',
      deleteVideo: 'admin/video/deleteVideo',
      editVideo: 'admin/video/editVideo'
    }),
    handleRead(rowData) {
      this.targetVideo = JSON.parse(JSON.stringify(rowData))
      this.dialogVisible = true
      this.dialogState = '查看'
    },
    handleCreate() {
      this.dialogVisible = true
      this.dialogState = '新增'
    },
    async handleDelete(rowData) {
      try {
        const result = await this.$confirm(`確定要刪除「${rowData.title}」這部影片嗎？`, '確認刪除', {
          confirmButtonText: '確認',
          cancelButtonText: '返回',
          type: 'warning'
        })

        if (result === 'cancel') {
          return
        }
        this.deleteVideo({ videoId: rowData.videoId })
      } catch (error) {
        console.log(error)
      }
    },
    changeState(state) {
      this.dialogState = state
    },
    resetDialog() {
      this.dialogVisible = false
      this.targetVideo = {
        title: '',
        embedIframe: ''
      }
    },
    async submitForm(formData) {
      try {
        this.loading = true
        if (!formData.videoId) {
          await this.createVideo(formData)
        } else {
          await this.editVideo(formData)
        }
        this.resetDialog()
        const { count, page } = this.getPagination
        await this.fetchVideos({ count, page })
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async jump(page) {
      this.loading = true
      await this.fetchVideos({ count: this.getPagination.count, page })
      this.loading = false
    },
    async changeSize(count) {
      this.loading = true
      await this.fetchVideos({ count, page: 1 })
      this.loading = false
    }
  }
}
</script>
