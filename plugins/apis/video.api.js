export default axios => ({
  fetchVideos() {
    return axios(`/videos`, {
      method: 'GET'
    })
  }
})
