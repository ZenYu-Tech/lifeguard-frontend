<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input v-model="articleContent.title" placeholder="請輸入 25 字內標題">
          <template slot="prepend">文章標題</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="articleContent.category" placeholder="選擇類別" :disabled="!!articleContent.articleId">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if="articleContent.category === 'news'">
      <el-input v-model="articleContent.mainPoint" placeholder="請輸入 60 字內簡介">
        <template slot="prepend">簡介</template>
      </el-input>
    </el-row>
    <el-row>
      <vue-editor v-model="articleContent.content" />
    </el-row>
    <el-row v-if="articleContent.category === 'experience'">
      <el-card shadow="never">
        <div class="image-wall">
          <label for="img" class="image-wall__new">
            ＋
            <input id="img" type="file" name="img" multiple @change="handleUpload($event)" />
          </label>
          <div
            v-for="(item, index) in articleContent.images"
            :key="`origin-${index}`"
            class="image-wall__preview"
            @click="addToDeletedImages(item)"
          >
            <img :src="`data:image/png;base64, ${item.image}`" :alt="`圖片${index + 1}`" />
          </div>
          <div
            v-for="(image, index) in newAddPreviewImages"
            :key="`new-${index}`"
            class="image-wall__preview"
            @click="addToDeletedImages(image)"
          >
            <img :src="image" :alt="`圖片${index + 1}`" />
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <div class="image-wall__button">
        <div>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="previewArticle">預覽</el-button>
        </div>
        <div>
          <el-button type="success" @click="submitForm">確認上傳</el-button>
        </div>
      </div>
    </el-row>
    <inner-article-preview
      v-if="dialogVisible"
      :article-content="articleContent"
      :dialog-visible="dialogVisible"
      :new-add-preview-images="newAddPreviewImages"
      @closeDialog="dialogVisible = false"
    ></inner-article-preview>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import InnerArticlePreview from './InnerArticlePreview'
let VueEditor

if (process.client) {
  VueEditor = require('vue2-editor').VueEditor
}

export default {
  name: 'ArticleForm',
  components: { VueEditor, InnerArticlePreview },
  props: {
    articleContent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        {
          value: 'news',
          label: '活動消息'
        },
        {
          value: 'experience',
          label: '活動花絮'
        }
      ],
      newAddPreviewImages: [],
      deletedImages: [],
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions('admin', {
      deleteImage: 'article/deleteImage'
    }),
    handleUpload(e) {
      const selectedFiles = e.target.files

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        this.articleContent.newAddImages.push(file)

        const reader = new FileReader()
        reader.onload = e => {
          const base64 = e.target.result
          this.newAddPreviewImages.push(base64)
        }
        reader.onerror = error => {
          console.log('Error: ', error)
        }
        reader.readAsDataURL(file)
      }
    },
    previewArticle() {
      this.dialogVisible = true
    },
    addToDeletedImages(target) {
      if (typeof target === 'object') {
        this.deletedImages.push(target)
        const existIndex = this.articleContent.images.indexOf(target)
        this.articleContent.images.splice(existIndex, 1)
      } else {
        const previewIndex = this.newAddPreviewImages.indexOf(target)
        this.newAddPreviewImages.splice(previewIndex, 1)
        this.articleContent.newAddImages.splice(previewIndex, 1)
      }
    },
    deleteArticleImage() {
      try {
        this.deletedImages.forEach(async image => {
          await this.deleteImage({
            category: this.articleContent.category,
            articleId: this.articleContent.articleId,
            imageId: image.imageId
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    submitForm() {
      if (!this.validateForm()) return
      this.deleteArticleImage()
      this.$emit('submitForm', this.articleContent)
    },
    validateForm() {
      if (this.articleContent.title.length < 1) {
        this.$message.error('請輸入文章標題')
      } else if (this.articleContent.category.length < 1) {
        this.$message.error('請選擇文章類別')
      } else if (this.articleContent.content.length < 1) {
        this.$message.error('請輸入文章內容')
      } else if (
        this.articleContent.category === 'experience' &&
        this.articleContent.images.length + this.articleContent.newAddImages.length < 1
      ) {
        this.$message.error('請至少選擇一張圖片！')
      } else if (
        this.articleContent.category === 'news' &&
        (this.articleContent.mainPoint.length < 0 || this.articleContent.mainPoint.length > 60)
      ) {
        this.$message.error('請輸入 60 字內的文章簡介')
      } else {
        return true
      }
      return false
    },
    goBack() {
      this.$router.back()
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

.image-wall {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__new {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    background-color: #fff;
    color: #d9d9d9;
    border: 1px dashed;
    border-radius: 10px;
    cursor: pointer;
    font-size: 60px;

    input[name='img'] {
      display: none;
    }

    &:hover {
      color: #419df7;
    }
  }
  &__preview {
    position: relative;
    width: 300px;
    height: 200px;
    margin-bottom: 20px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover::after {
      content: '點擊刪除';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      font-size: 20px;
    }
  }
  &__button {
    display: flex;
    justify-content: space-between;
  }
}
</style>
