export default axios => ({
  fetchVideos() {
    return axios(`/video`, {
      method: 'GET'
    })
  }
})
