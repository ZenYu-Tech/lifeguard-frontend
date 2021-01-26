import DeviceDetector from 'device-detector-js'
const cookieparser = process.server ? require('cookieparser') : undefined

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

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const token = parsed.token
      if (token) {
        commit('admin/user/SET_token', token)
      } else {
        commit('admin/user/SET_token', null)
      }
    }
  }
}
