/**
 * @typeof User
 * @type {object}
 * @property {string} userId
 * @property {string} userAccout
 * @property {date} createdAt
 */

const state = () => ({
  /**
   * @type {Object<User>}
   */
  user: 
    {
      userId: 1,
      userAccout: '使用者1號',
      createdAt: new Date()
    }
})

const getters = {
  getLoginStatus: state => !!state.User.userId,
  getUserDetail: state => state.User
}

const mutations = {
  SET_userDetail(state, user) {
    state.user = user
  }
}

const actions = {
  async login({ commit }, payload) {
    try {
      const { data } = await this.$userApi.login(payload)
      commit('SET_userDetail', data)
    } catch (error) {
      console.error(error)
    }
  },
  async logout({ commit }) {
    try {
      const { data } = await this.$userApi.logout()
      commit('SET_userDetail', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
