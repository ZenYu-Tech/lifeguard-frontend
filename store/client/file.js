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
  files: []
})

const getters = {
  getFiles: state => state.files,
  getFilesByCategory: state => category => {
    return state.files.filter(file => file.category === category)
  }
}

const mutations = {
  SET_Files(state, files) {
    state.files = files
  }
}

const actions = {
  async fetchFiles({ commit }) {
    try {
      const { data } = await this.$fileApi.fetchFiles()
      commit('SET_Files', data.result.files)
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
