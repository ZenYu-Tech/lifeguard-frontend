/**
 * @typeof Article
 * @type {object}
 * @property {string} articleId
 * @property {string} category
 * @property {string} title
 * @property {string} content
 * @property {number} sort
 * @property {date} createdAt
 * @property {base64} mainImage
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
    articleId: '1',
    title: 'title',
    content: '<html>Hello world 31</html>',
    category: 'news',
    createdAt: '2021-01-16T06:37:58.000Z',
    /**
     * @type {Array<Image>}
     */
    images: []
  },
  pagination: {
    page: 1,
    count: 10,
    totalCount: 4,
    totalPage: 1
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
  Init_articles(state, articles) {
    state.articles = articles
  },
  Add_articles(state, articles) {
    state.articles.push(...articles)
  },
  SET_pagination(state, pagination) {
    Object.keys(pagination).forEach(key => {
      state.pagination[key] = Number(pagination[key])
    })
  }
}

const actions = {
  async fetchArticle({ commit }, { category, articleId }) {
    try {
      const { data } = await this.$articleApi.fetchArticle(category, articleId)
      commit('SET_article', data.result)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchArticles({ commit }, { category, count = 10, page = 1 }) {
    try {
      const { data } = await this.$articleApi.fetchArticles(category, count, page)
      commit('SET_pagination', data.result.pagination)
      if (page === 1) {
        commit('Init_articles', data.result.articles)
      } else {
        commit('Add_articles', data.result.articles)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
