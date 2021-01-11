<template>
  <el-dialog
    :title="dialogState"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-row>
      <div v-if="!!videoContent.url" class="video-preview" v-html="videoContent.url"></div>
      <div v-else class="video-preview__placeholder">影片預覽</div>
    </el-row>

    <el-form :model="videoContent" :rules="rules" ref="ruleForm" label-width="0">
      <el-row>
        <el-form-item prop="title">
          <el-input placeholder="請輸入影片標題" v-model="videoContent.title" :disabled="!isEditable">
            <template slot="prepend">標題</template>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="url">
          <el-input
            type="textarea"
            autosize
            placeholder="請貼上 YouTube 影片內嵌 iframe"
            v-model="videoContent.url"
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
export default {
  name: 'video-form',
  props: {
    rules: { type: Object },
    dialogVisible: { type: Boolean },
    videoContent: { type: Object },
    dialogState: { type: String }
  },
  data() {
    return {
      isEditable: false
    }
  },
  created() {
    this.judgeEditState()
  },
  watch: {
    dialogVisible(currentState) {
      if (!currentState) {
        this.$emit('reset-dialog')
      }
    }
  },
  methods: {
    handleEdit() {
      this.$emit('change-state', '編輯')
      this.isEditable = true
    },
    judgeEditState() {
      switch (this.dialogState) {
        case '查看':
          this.isEditable = false
          break
        case '新增':
          this.isEditable = true
          break
      }
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('確定要上傳影片嗎？', '確認上傳', {
            confirmButtonText: '確認',
            cancelButtonText: '返回',
            type: 'warning'
          }).then(() => {
            // sent request ..
            this.$message({
              type: 'success',
              message: '上傳成功'
            })
          })
        } else return false
      })
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