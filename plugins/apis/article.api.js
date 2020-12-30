export default axios => ({
  fetchArticle(category, id) {
    return axios(`/articles/${category}/${id}`, {
      method: 'GET'
    })
  },
  fetchArticles(category) {
    return axios(`/articles/${category}`, {
      method: 'GET'
    })
  }
})
