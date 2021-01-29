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
  files: [],
  pagination: {
    page: 1,
    count: 10,
    totalCount: 4,
    totalPage: 1,
    next: '',
    previous: ''
  }
})

const getters = {
  getFiles: state => state.files,
  getFilesByCategory: state => category => {
    return state.files.filter(file => file.category === category)
  },
  getPagination: state => state.pagination
}

const mutations = {
  SET_Files(state, files) {
    state.files = files
  },
  SET_pagination(state, pagination) {
    Object.keys(pagination).forEach(key => {
      if (key === 'next' || key === 'previous') {
        state.pagination[key] = pagination[key]
        return
      }
      state.pagination[key] = Number(pagination[key])
    })
  }
}

const actions = {
  async fetchFiles({ commit }, { category, count, page }) {
    try {
      const { data } = await this.$fileApi.admin.fetchFiles(category, count, page)
      const { pagination, files } = data?.result

      commit('SET_pagination', pagination)
      commit('SET_Files', files)
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
