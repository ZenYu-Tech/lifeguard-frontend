const state = () => ({
  news: {},
  newsList: []
})

const getters = {
  news: state => state.news,
  newsList: state => state.newsList
}

const mutations = {
  SET_news(state, news) {
    state.news = news
  },
  SET_newsList(state, newsList) {
    state.newsList = newsList
  }
}

const actions = {
  async getNews({ commit }, id) {
    try {
      const { data } = await this.$newsApi.getNews(id)
      commit('SET_news', data)
    } catch (error) {
      console.error(error)
    }
  },
  async getAllNews({ commit }) {
    try {
      const { data } = await this.$newsApi.getAllNews()
      commit('SET_news', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
