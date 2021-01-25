const Cookie = process.client ? require('js-cookie') : undefined

/**
 * @typeof User
 * @type {object}
 * @property {string} userId
 * @property {string} account
 * @property {string} role
 */

const state = () => ({
  /**
   * @type {Object<User>}
   */
  user: {
    userId: 1,
    account: '',
    role: ''
  },
  token: null
})

const getters = {
  getUser: state => state.User,
  getToken: state => state.token
}

const mutations = {
  SET_user(state, user) {
    state.user = user
  },
  SET_token(state, token) {
    state.token = token
  }
}

const actions = {
  async login({ commit }, { account, password }) {
    try {
      const params = new URLSearchParams()
      params.append('account', account)
      params.append('password', password)

      const { data } = await this.$userApi.login(params)
      const token = data.result.token

      commit('SET_user', data.result.user)
      commit('SET_token', token)
      Cookie.set('token', token)
    } catch (error) {
      console.error(error)
    }
  },
  logout({ commit }) {
    try {
      commit('SET_token', null)
      Cookie.remove('token')
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
