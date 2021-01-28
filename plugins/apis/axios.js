/**
 * To see $axios api interface (Source Code: https://github.com/nuxt-community/axios-module/blob/master/lib/plugin.js)
 */
import { Message } from 'element-ui'

export default function ({ $axios, $config, redirect, store }, inject) {
  $axios.setBaseURL($config.baseURL)

  $axios.onRequest(request => {
    request.headers.Authorization = `Bearer ${store.getters['admin/user/getToken']}`
    console.log('Making request to ' + request.url)
  })

  $axios.onResponse(response => {
    if (response.config.method !== 'get') {
      Message.success(response.data.message)
    }
  })

  $axios.onResponseError(error => {
    const status = error.response.status

    if (status === 401) {
      return redirect('/admin/login')
    } else {
      Message.error('系統異常')
    }
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

// export default service
