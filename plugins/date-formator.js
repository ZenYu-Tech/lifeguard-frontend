export default ({ store }, inject) => {
  inject('formatDate', (date, showTime = false) => {
    if (showTime) {
      return new Date(date).toISOString().slice(0, 16).replace('T', ' ')
    }
    return new Date(date).toISOString().slice(0, 10)
  })
}
