/**
 * @typeof File
 * @type {object}
 * @property {string} fileId
 * @property {string} category
 * @property {string} title
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
  async fetchFiles({ commit }, { category }) {
    try {
      const { data } = await this.$fileApi.fetchFiles(category)
      commit('SET_Files', data)
    } catch (error) {
      console.error(error)
    }
  },
  async downloadFile(context, { fileId, title }) {
    try {
      const { data } = await this.$fileApi.downloadFile(fileId)
      let extension = title.split('.')
      extension = extension[extension.length - 1]

      const url = `data:application/${extension};base64,${data}`
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
