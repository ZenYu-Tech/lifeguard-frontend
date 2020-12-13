export default axios => ({
  getNews(id) {
    return axios(`/experiences/${id}`, {
      method: 'GET'
    })
  },
  getAllNews() {
    return axios(`/experiences`, {
      method: 'GET'
    })
  }
})
