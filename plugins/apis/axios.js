/**
 * To see $axios api interface (Source Code: https://github.com/nuxt-community/axios-module/blob/master/lib/plugin.js)
 */

export default function ({ $axios, $config, store }, inject) {
  $axios.setBaseURL($config.baseURL)

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    const data = response.data
    if (data.result?.pagination) {
      store.commit('helper/SET_pagination', data.result.pagination)
    }
  })

  $axios.onResponseError(error => {
    Promise.reject(error)
  })

  const files = require.context('@/plugins/apis', false, /.api.js$/i)
  files.keys().forEach(key => {
    const fileName = getFileName(key)
    const module = files(key).default
    inject(fileName + 'Api', module($axios))
  })
}

/**
 * @param {string} path file path(i.e. ./news.api.js)
 * @returns {string} a filename without .api.js extension
 */

const getFileName = path => {
  return path.substr(path.lastIndexOf('/') + 1).replace(/\.api.js$/, '')
}
