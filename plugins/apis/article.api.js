export default axios => ({
  fetchArticle(category, id) {
    return axios(`/article/${category}/${id}`, {
      method: 'GET'
    })
  },
  fetchArticles(category) {
    return axios(`/article/${category}`, {
      method: 'GET'
    })
  }
})
