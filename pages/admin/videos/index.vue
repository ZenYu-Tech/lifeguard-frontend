<template>
  <div class="admin-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="影片標題"> </el-table-column>
      <el-table-column prop="created_time" label="建立時間" width="120"> </el-table-column>
      <el-table-column align="right" width="120">
        <template slot="header">
          <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button @click="handleRead(row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDelete(row)" type="text" size="small">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <video-form
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :video-content="targetVideo"
      :dialog-state="dialogState"
      :rules="formRules"
      @change-state="changeState"
      @reset-dialog="resetDialog"
    ></video-form>
  </div>
</template>
<script>
const newsData = [
  {
    id: 1,
    title: '泳池救生員檢定流程SOP',
    url:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/FmrGz8qSyrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    created_time: '2020-01-01'
  },
  {
    id: 2,
    title: '泳池救生員檢定流程SOP',
    url:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/FmrGz8qSyrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    created_time: '2020-01-01'
  },
  {
    id: 3,
    title: '泳池救生員檢定流程SOP',
    url:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/FmrGz8qSyrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    created_time: '2020-01-01'
  },
  {
    id: 4,
    title: '泳池救生員檢定流程SOP',
    url:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/FmrGz8qSyrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    created_time: '2020-01-01'
  }
]
import videoForm from '@/components/admin/videos/videoForm'

export default {
  name: 'videos',
  layout: 'admin',
  components: { videoForm },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      targetVideo: {
        id: 0,
        title: '',
        url: ''
      },
      formRules: {
        title: { required: true, message: '請輸入影片標題', trigger: 'blur' },
        url: { required: true, message: '請貼上影片 iframe', trigger: 'blur' }
      },
      dialogState: ''
    }
  },
  created() {
    this.tableData = newsData
  },

  methods: {
    handleRead(rowData) {
      this.targetVideo = rowData
      this.dialogVisible = true
      this.dialogState = '查看'
    },
    handleCreate() {
      this.dialogVisible = true
      this.dialogState = '新增'
    },
    handleDelete(rowData) {
      this.$confirm(`確定要刪除「${rowData.title}」這部影片嗎？`, '確認刪除', {
        confirmButtonText: '確認',
        cancelButtonText: '返回',
        type: 'warning'
      }).then(() => {
        // sent request ..
        this.$message({
          type: 'success',
          message: '刪除成功'
        })
      })
    },
    changeState(state) {
      this.dialogState = state
    },
    resetDialog() {
      this.dialogVisible = false
      this.targetVideo = {
        id: 0,
        title: '',
        url: ''
      }
    }
  }
}
</script>