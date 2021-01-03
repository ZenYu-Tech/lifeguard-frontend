const state = () => ({
  haveBanner: false,
  currentDevice: 'mobile'
})

const getters = {
  getHaveBanner: state => state.haveBanner,
  getCurrentDevice: state => state.currentDevice
}

const mutations = {
  SET_haveBanner(state, bool) {
    state.haveBanner = bool
  },
  SET_currentDevice(state, device) {
    state.currentDevice = device
  }
}

const actions = {}

export { state, getters, mutations, actions }
