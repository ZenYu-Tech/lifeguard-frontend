export default axios => ({
  fetchVideos() {
    return axios(`/video`, {
      method: 'GET'
    })
  },
  admin: {
    fetchVideos(count, page) {
      return axios(`/manage/video?count=${count}&page=${page}`, {
        method: 'GET'
      })
    },
    createVideo(params) {
      return axios(`/manage/video`, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        data: params
      })
    },
    editVideo(videoId, params) {
      return axios(`/manage/video/${videoId}`, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'PUT',
        data: params
      })
    },
    deleteVideo(videoId) {
      return axios(`/manage/video/${videoId}`, {
        method: 'DELETE'
      })
    }
  }
})
