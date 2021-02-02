/**
 * @typeof File
 * @type {object}
 * @property {string} fileId
 * @property {string} category
 * @property {string} title
 * @property {number} sort
 */
const state = () => ({
  /**
   * @type {Array<File>}
   */
  headerFiles: [],
  /**
   * @type {Array<File>}
   */
  certificationFiles: []
})

const getters = {
  getCertificationFiles: state => state.certificationFiles,
  getHeaderFiles: state => state.headerFiles
}

const mutations = {
  SET_headerFiles(state, files) {
    state.headerFiles = files
  },
  SET_certificationFiles(state, files) {
    state.certificationFiles = files
  }
}

const actions = {
  async fetchCertificationFiles({ commit }) {
    try {
      const { data } = await this.$fileApi.fetchCertificationFiles()
      commit('SET_certificationFiles', data.result.files)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchHeaderFiles({ commit }) {
    try {
      const { data } = await this.$fileApi.fetchHeaderFiles()
      commit('SET_headerFiles', data.result.files)
    } catch (error) {
      console.error(error)
    }
  },
  async downloadFile(context, { fileId }) {
    try {
      const { data } = await this.$fileApi.downloadFile(fileId)
      const { extension, file, title } = data.result

      const url = `data:application/${extension};base64,${file}`
      const a = document.createElement('a')
      a.href = url
      a.download = title
      a.click()
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
