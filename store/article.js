/**
 * @typeof Article
 * @type {object}
 * @property {number} id
 * @property {string} category
 * @property {string} title
 * @property {string} content
 * @property {number} sort
 * @property {boolean} show
 * @property {date} createdAt
 * @property {Array<ArticleImage>} articleImages
 */

/**
 * @typeof ArticleImage
 * @type {object}
 * @property {number} id
 * @property {number} articleId
 * @property {string} url
 * @property {boolean} mainImage
 * @property {boolean} show
 */

const state = () => ({
  /**
   * @type {Array<Article>}
   */
  articles: [],
  /**
   * @type {Article}
   */
  article: {}
})

const getters = {
  getArticles: state => state.articles,
  getArticlesByCategory: state => category => {
    return state.articles.filters(article => article.category === category)
  },
  getArticle: state => state.article,
  getArticleById: state => id => {
    return state.articles.find(article => article.id === id)
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
  async getArticle({ commit }, { category, id }) {
    try {
      const { data } = await this.$articleApi.getArticle(category, id)
      commit('SET_article', data)
    } catch (error) {
      console.error(error)
    }
  },
  async getArticles({ commit }, { category }) {
    try {
      const { data } = await this.$articleApi.getArticles(category)
      commit('SET_articles', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
