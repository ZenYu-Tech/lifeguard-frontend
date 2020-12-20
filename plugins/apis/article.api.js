export default axios => ({
  getArticle(category, id) {
    return axios(`/articles/${category}/${id}`, {
      method: 'GET'
    })
  },
  getArticles(category) {
    return axios(`/experiences/${category}`, {
      method: 'GET'
    })
  }
})
