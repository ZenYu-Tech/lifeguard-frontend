const state = () => ({
  haveBanner: false,
  currentDevice: 'mobile',
  pagination: {
    page: 1,
    count: 10,
    totalCount: 4,
    totalPage: 1
  }
})

const getters = {
  getHaveBanner: state => state.haveBanner,
  getCurrentDevice: state => state.currentDevice,
  getPagination: state => state.pagination
}

const mutations = {
  SET_haveBanner(state, bool) {
    state.haveBanner = bool
  },
  SET_currentDevice(state, device) {
    state.currentDevice = device
  },
  SET_pagination(state, pagination) {
    state.pagination = pagination
  }
}

const actions = {}

export { state, getters, mutations, actions }
