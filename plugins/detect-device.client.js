export default function ({ store }) {
  function detect() {
    const width = window.screen.width
    let device = 'mobile'

    if (width >= 1200) {
      device = 'desktop'
    } else if (width < 1200 && width >= 768) {
      device = 'tablet'
    }

    if (device !== store.getters['helper/getCurrentDevice']) {
      store.commit('helper/SET_currentDevice', device)
    }
  }
  window.addEventListener('resize', detect)
  detect()
}
