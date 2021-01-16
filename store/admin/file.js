/**
 * @typeof File
 * @type {object}
 * @property {string} fileId
 * @property {string} category
 * @property {string} title
 * @property {number} sort
 * @property {date} createdAt
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
  async fetchFiles({ commit }, { category, count, page }) {
    try {
      const { data } = await this.$fileApi.admin.fetchFiles(category, count, page)
      commit('SET_Files', data.result.files)
    } catch (error) {
      console.error(error)
    }
  },
  async createFile(content, { category, title, file }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)
      await this.$fileApi.admin.createFile(category, formData)
    } catch (error) {
      console.error(error)
    }
  },
  async editFile(context, { category, fileId, title, file }) {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)
      await this.$fileApi.admin.editFile(category, fileId, formData)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteFile(context, { category, fileId }) {
    try {
      await this.$fileApi.admin.deleteFile(category, fileId)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
