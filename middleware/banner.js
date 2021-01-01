export default function ({ route, store }) {
  if (route.meta[0].haveBanner) {
    store.commit('helper/SET_haveBanner', true)
  } else {
    store.commit('helper/SET_haveBanner', false)
  }
}
