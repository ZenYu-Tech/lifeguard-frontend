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
  articles: [
    {
      articleId: '1',
      title: '資管系 12/10  專題演講：Visualized Data Analysis',
      content: `電子商務與商業分析數位學習碩專班（網路同步上課
      適合全球在職行動辦公人士。電子商務與商業分析數位學習碩專班（網路同步上課） 適合全球在職行動辦公人士。`,
      category: 'news',
      createdAt: new Date()
    },
    {
      articleId: '2',
      title: '資管系 12/10  專題演講：Visualized Data Analysis',
      content: '電子商務與商業分與商業分析數位學習碩專班（網路同步上課） 適合全球在職行動辦公人士。',
      category: 'news',
      createdAt: new Date()
    },
    {
      articleId: '3',
      title: '資管系 12/10  專題演講：Visualized Data Analysis',
      content: `電子商務與商業分析數位學習碩專班（網路同步上課
      適合全球在職行動辦公人士。電子商務與商業分析數位學習碩專班（網路同步上課） 適合全球在職行動辦公人士。`,
      category: 'news',
      createdAt: new Date()
    }
  ],
  /**
   * @type {Article}
   */
  article: {}
})

const getters = {
  getArticles: state => state.articles,
  getArticlesByCategory: state => category => {
    return state.articles.filter(article => article.category === category)
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
  async fetchArticle({ commit }, { category, id }) {
    try {
      const { data } = await this.$articleApi.fetchArticle(category, id)
      commit('SET_article', data)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchArticles({ commit }, { category }) {
    try {
      const { data } = await this.$articleApi.fetchArticles(category)
      commit('SET_articles', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
