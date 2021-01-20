import DeviceDetector from 'device-detector-js'

export const actions = {
  nuxtServerInit({ getters, commit }, { req }) {
    console.log('nuxtServerInit')

    const deviceDetector = new DeviceDetector()
    const userAgent = req.headers['user-agent']
    const result = deviceDetector.parse(userAgent)
    const device = result?.device?.type === 'smartphone' ? 'mobile' : result.device.type

    if (device !== getters['helper/getCurrentDevice']) {
      commit('helper/SET_currentDevice', device)
    }
  }
}
