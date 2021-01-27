/**
 * @typeof Article
 * @type {object}
 * @property {string} articleId
 * @property {string} category
 * @property {string} title
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
    content: '',
    category: '',
    /**
     * @type {Array<Image>}
     */
    images: []
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
  }
}

const mutations = {
  SET_article(state, article) {
    state.article = article
  },
  SET_articles(state, articles) {
    state.articles = articles
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
      commit('SET_articles', data.result.articles)
    } catch (error) {
      console.error(error)
    }
  },
  async createArticle(context, { category, title, content, mainImageIndex, images }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('mainImageIndex', mainImageIndex)
      formData.append('images', images)
      return await this.$articleApi.admin.createArticle(category, formData)
    } catch (error) {
      console.error(error)
    }
  },
  async editArticle(context, { category, articleId, title, content, mainImageIndex, images }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('mainImageIndex', mainImageIndex)
      formData.append('images', images)
      return await this.$articleApi.admin.editArticle(category, articleId, formData)
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
