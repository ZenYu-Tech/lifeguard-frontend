export default axios => ({
  fetchArticle(category, id) {
    return axios(`/article/${category}/${id}`, {
      method: 'GET'
    })
  },
  fetchArticles(category, count = 10, page = 1) {
    return axios(`/article/${category}/?count=${count}&page=${page}`, {
      method: 'GET'
    })
  }
})
