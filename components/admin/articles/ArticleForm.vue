<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input v-model="articleContent.title" placeholder="請輸入">
          <template slot="prepend">文章標題</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="articleContent.category" placeholder="選擇類別">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <vue-editor v-model="articleContent.content" />
    </el-row>
    <el-row v-if="articleContent.category === 'experience'">
      <el-card shadow="never">
        <div class="image-wall">
          <label for="img" class="article-create__img"
            >＋
            <input id="img" type="file" name="img" multiple @change="handleUpload($event)" />
          </label>
          <div
            v-for="item in articleContent.images"
            :key="item.imageId"
            class="preview"
            @click="handleDeleteImage(item.imageId)"
          >
            <img :src="item.image" :data-id="item.imageId" />
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <div class="article-create__button">
        <div>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="previewArticle">預覽</el-button>
        </div>
        <div>
          <el-button type="success" @click="submitForm">確認上傳</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
let VueEditor

if (process.client) {
  VueEditor = require('vue2-editor').VueEditor
}

export default {
  name: 'ArticleForm',
  components: { VueEditor },
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
          label: '通知中心'
        },
        {
          value: 'experience',
          label: '活動花絮'
        }
      ]
    }
  },
  watch: {
    'articleContent.category'(newVal) {
      if (newVal !== 'experience') {
        this.imageArray = []
      }
    }
  },
  methods: {
    handleUpload(e) {
      const selectedFiles = e.target.files
      for (let i = 0; i < selectedFiles.length; i++) {
        this.imageArray.push(selectedFiles[i])
      }

      for (let i = 0; i < this.imageArray.length; i++) {
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          function () {
            this.$refs['image' + parseInt(i)][0].src = reader.result
          }.bind(this),
          false
        )

        reader.readAsDataURL(this.imageArray[i])
      }
    },
    previewArticle() {
      console.log('previewArticle')
    },
    submitForm() {
      this.$emit('submitForm', this.articleContent)
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
}

.preview {
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
}

.preview:hover::after {
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

.article-create {
  &__img {
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
  &__button {
    display: flex;
    justify-content: space-between;
  }
}
</style>
