const state = () => ({
  haveBanner: false
})

const getters = {
  getHaveBanner: state => state.haveBanner
}

const mutations = {
  SET_haveBanner(state, bool) {
    state.haveBanner = bool
  }
}

const actions = {}

export { state, getters, mutations, actions }
