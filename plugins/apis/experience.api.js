export default axios => ({
  getExperience(id) {
    return axios(`/experiences/${id}`, {
      method: 'GET'
    })
  },
  getAllExperiences() {
    return axios(`/experiences`, {
      method: 'GET'
    })
  }
})
