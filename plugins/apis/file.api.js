export default axios => ({
  fetchFiles(category) {
    return axios(`/file/${category}`, {
      method: 'GET'
    })
  },
  downloadFile(fileId) {
    return axios(`/file/download/${fileId}`, {
      method: 'GET'
    })
  }
})
