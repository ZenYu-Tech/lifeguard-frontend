<template>
  <el-dialog
    :title="dialogState"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-row>
      <div v-if="!!videoContent.embedIframe" class="video-preview" v-html="videoContent.embedIframe"></div>
      <div v-else class="video-preview__placeholder">影片預覽</div>
    </el-row>

    <el-form ref="ruleForm" :model="videoContent" :rules="formRules" label-width="0">
      <el-row>
        <el-form-item prop="title">
          <el-input v-model="videoContent.title" placeholder="請輸入影片標題" :disabled="!isEditable">
            <template slot="prepend">標題</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="embedIframe">
          <el-input
            v-model="videoContent.embedIframe"
            type="textarea"
            autosize
            placeholder="請貼上 YouTube 影片內嵌 iframe"
            :disabled="!isEditable"
          >
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">關閉</el-button>
      <el-button v-if="isEditable" type="success" @click="handleSubmit('ruleForm')">完成</el-button>
      <el-button v-else type="primary" @click="handleEdit">編輯</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'VideoForm',
  props: {
    dialogVisible: { type: Boolean, required: true },
    videoContent: { type: Object, required: true },
    dialogState: { type: String, required: true }
  },
  data() {
    return {
      formRules: {
        title: { required: true, message: '請輸入影片標題', trigger: 'blur' },
        embedIframe: { required: true, message: '請貼上影片 iframe', trigger: 'blur' }
      }
    }
  },
  computed: {
    isEditable() {
      return this.dialogState !== '查看'
    }
  },
  watch: {
    dialogVisible(currentState) {
      if (!currentState) {
        this.$emit('reset-dialog')
      }
    }
  },
  methods: {
    ...mapActions({
      createVideo: 'admin/video/createVideo',
      editVideo: 'admin/video/editVideo'
    }),
    handleEdit() {
      this.$emit('change-state', '編輯')
    },
    async handleSubmit(formName) {
      try {
        await this.$refs[formName].validate()

        const result = await this.$confirm('確定要上傳影片嗎？', '確認上傳', {
          confirmButtonText: '確認',
          cancelButtonText: '返回',
          type: 'warning'
        })

        if (result === 'cancel') return

        if (!this.videoContent.videoId) {
          const { title, embedIframe } = this.videoContent
          this.createVideo({ title, embedIframe })
        } else {
          const { videoId, title, embedIframe } = this.videoContent
          this.editVideo({ videoId, title, embedIframe })
        }
        this.handleClose()
      } catch (error) {
        console.log('error')
      }
    },
    handleClose() {
      this.$emit('reset-dialog')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.video-preview {
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.video-preview__placeholder {
  width: 100%;
  height: 300px;
  background: rgba(196, 196, 196, 0.5);
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
