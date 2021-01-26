export default axios => ({
  login(params) {
    return axios(`/manage/user/signin`, {
      method: 'POST',
      data: params
    })
  }
})
