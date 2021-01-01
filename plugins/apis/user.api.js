export default axios => ({
  login() {
    return axios(`manage/login`, {
      method: 'POST',
      data: input
    })
  },
  logout() {
    return axios(`manage/logout`, {
      method: 'POST'
    })
  }
})
