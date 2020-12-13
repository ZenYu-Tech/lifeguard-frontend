export default axios => ({
  getNews(id) {
    return axios(`news/${id}`, {
      method: 'GET'
    })
  },
  getAllNews() {
    return axios(`news`, {
      method: 'GET'
    })
  }
})
