export default axios => ({
  fetchArticle(category, articleId) {
    return axios(`/article/${category}/${articleId}`, {
      method: 'GET'
    })
  },
  fetchArticles(category, count = 10, page = 1) {
    return axios(`/article/${category}/?count=${count}&page=${page}`, {
      method: 'GET'
    })
  },
  admin: {
    fetchArticles(count = 10, page = 1) {
      return axios(`/manage/article/?count=${count}&page=${page}`, {
        method: 'GET'
      })
    },
    createArticle(category, formData) {
      return axios(`/manage/article/${category}`, {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        data: formData
      })
    },
    fetchArticle(category, articleId) {
      return axios(`/manage/article/${category}/${articleId}`, {
        method: 'GET'
      })
    },
    editArticle(category, articleId, formData) {
      return axios(`/manage/article/${category}/${articleId}`, {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'PUT',
        data: formData
      })
    },
    deleteArticle(category, articleId) {
      return axios(`/manage/article/${category}/${articleId}`, {
        method: 'DELETE'
      })
    },
    deleteImage(category, articleId, imageId) {
      return axios(`/manage/article/${category}/${articleId}/${imageId}`, {
        method: 'DELETE'
      })
    }
  }
})
