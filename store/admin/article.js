/**
 * @typeof Article
 * @type {object}
 * @property {string} articleId
 * @property {string} category
 * @property {string} title
 * @property {string} mainPoint
 * @property {string} content
 * @property {number} sort
 * @property {boolean} show
 * @property {date} createdAt
 * @property {date} updatedAt
 */

/**
 * @typeof Image
 * @type {object}
 * @property {string} imageId
 * @property {boolean} main
 * @property {base64} image
 */

const state = () => ({
  /**
   * @type {Array<Article>}
   */
  articles: [],
  article: {
    articleId: -1,
    title: '',
    mainPoint: '',
    content: '',
    category: '',
    /**
     * @type {Array<Image>}
     */
    images: []
  },
  pagination: {
    page: 1,
    count: 10,
    totalCount: 4,
    totalPage: 1,
    next: '',
    previous: ''
  }
})

const getters = {
  getArticles: state => state.articles,
  getArticlesByCategory: state => category => {
    return state.articles.filter(article => article.category === category)
  },
  getArticle: state => state.article,
  getArticleById: state => id => {
    return state.articles.find(article => article.articleId === id)
  },
  getPagination: state => state.pagination
}

const mutations = {
  SET_article(state, article) {
    state.article = article
  },
  SET_articles(state, { articles }) {
    state.articles = articles
  },
  Add_articles(state, { articles }) {
    state.articles.push(...articles)
  },
  SET_pagination(state, pagination) {
    Object.keys(pagination).forEach(key => {
      if (key === 'next' || key === 'previous') {
        state.pagination[key] = pagination[key]
        return
      }
      state.pagination[key] = Number(pagination[key])
    })
  }
}

const actions = {
  async fetchArticle({ commit }, { category, articleId }) {
    try {
      const { data } = await this.$articleApi.admin.fetchArticle(category, articleId)
      commit('SET_article', data.result)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchArticles({ commit }, { count = 10, page = 1 }) {
    try {
      const { data } = await this.$articleApi.admin.fetchArticles(count, page)
      const { pagination, articles } = data?.result

      commit('SET_pagination', pagination)
      commit('SET_articles', { articles })
    } catch (error) {
      console.error(error)
    }
  },
  async createArticle(context, { category, title, mainPoint, content, mainImageIndex, newAddImages }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (category === 'news') {
        formData.append('mainPoint', mainPoint)
      }
      if (category === 'experience') {
        formData.append('mainImageIndex', mainImageIndex)
        newAddImages.forEach(image => formData.append('images', image))
      }
      await this.$articleApi.admin.createArticle(category, formData)
    } catch (error) {
      console.error(error)
    }
  },
  async editArticle(context, { category, articleId, title, mainPoint, content, mainImageIndex, newAddImages }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (category === 'news') {
        formData.append('mainPoint', mainPoint)
      }
      if (category === 'experience') {
        formData.append('mainImageIndex', mainImageIndex)
        newAddImages.forEach(image => formData.append('images', image))
      }
      await this.$articleApi.admin.editArticle(category, articleId, formData)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteArticle(context, { category, articleId }) {
    try {
      await this.$articleApi.admin.deleteArticle(category, articleId)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteImage(context, { category, articleId, imageId }) {
    try {
      await this.$articleApi.admin.deleteImage(category, articleId, imageId)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
