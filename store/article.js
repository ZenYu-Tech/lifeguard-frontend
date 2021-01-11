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
  async fetchArticle({ commit }, { category, id }) {
    try {
      const { data } = await this.$articleApi.fetchArticle(category, id)
      commit('SET_article', data.result)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchArticles({ commit }, { category, count = 10, page = 1 }) {
    try {
      const { data } = await this.$articleApi.fetchArticles(category, count, page)
      commit('SET_articles', data.result.articles)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
