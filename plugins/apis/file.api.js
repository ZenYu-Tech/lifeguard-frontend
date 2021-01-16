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
  },
  admin: {
    fetchFiles(category, count, page) {
      return axios(`/manage/file/${category}?count=${count}&page=${page}`, {
        method: 'GET'
      })
    },
    createFile(category, formData) {
      return axios(`/manage/file/${category}`, {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        data: formData
      })
    },
    editFile(category, fileId, formData) {
      return axios(`/manage/file/${category}/${fileId}`, {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'PUT',
        data: formData
      })
    },
    deleteFile(category, fileId) {
      return axios(`/manage/file/${category}/${fileId}`, {
        method: 'DELETE'
      })
    }
  }
})
