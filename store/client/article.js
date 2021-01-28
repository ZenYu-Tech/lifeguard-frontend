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
  newsArticles: [],
  /**
   * @type {Array<Article>}
   */
  experienceArticles: [],
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
    totalPage: 1,
    next: '',
    previous: ''
  }
})

const getters = {
  getNewsArticles: state => state.newsArticles,
  getExperienceArticles: state => state.experienceArticles,
  getArticlesByCategory: state => category => state[`${category}Articles`],
  getArticle: state => state.article,
  getPagination: state => state.pagination
}

const mutations = {
  SET_article(state, article) {
    state.article = article
  },
  Init_articles(state, { category, articles }) {
    state[`${category}Articles`] = articles
  },
  Add_articles(state, { category, articles }) {
    state[`${category}Articles`].push(...articles)
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
      const { data } = await this.$articleApi.fetchArticle(category, articleId)
      const { pagination, article } = data?.result

      commit('SET_article', article)
      commit('SET_pagination', pagination)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchArticles({ commit }, { category, count = 10, page = 1 }) {
    try {
      const { data } = await this.$articleApi.fetchArticles(category, count, page)
      const { pagination, articles } = data?.result

      commit('SET_pagination', pagination)
      if (page === 1) {
        commit('Init_articles', { category, articles })
      } else {
        commit('Add_articles', { category, articles })
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
