export default ({ store }, inject) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Taipei'
  }
  inject('formatDate', (date, showTime = false) => {
    const formattedDate = new Date(date).toLocaleString('zh-TW', options).replace(/\//g, '/')
    if (showTime) {
      return formattedDate
    }
    return formattedDate.slice(0, 10)
  })
}
