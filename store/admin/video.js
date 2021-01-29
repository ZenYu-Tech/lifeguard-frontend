/**
 * @typeof Video
 * @type {object}
 * @property {string} videoId
 * @property {string} title
 * @property {string} embedIframe
 * @property {number} sort
 * @property {date} createdAt
 * @property {base64} image
 */

const state = () => ({
  /**
   * @type {Array<Video>}
   */
  videos: [],
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
  getVideos: state => state.videos.slice().sort((a, b) => a.sort - b.sort),
  getPagination: state => state.pagination
}

const mutations = {
  SET_videos(state, videos) {
    state.videos = videos
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
  async fetchVideos({ commit }, { count, page }) {
    try {
      const { data } = await this.$videoApi.admin.fetchVideos(count, page)
      const { pagination, videos } = data?.result

      commit('SET_pagination', pagination)
      commit('SET_videos', videos)
    } catch (error) {
      console.error(error)
    }
  },
  async createVideo(context, { title, embedIframe }) {
    try {
      const params = new URLSearchParams()
      params.append('title', title)
      params.append('embedIframe', embedIframe)

      await this.$videoApi.admin.createVideo(params)
    } catch (error) {
      console.error(error)
    }
  },
  async editVideo(context, { videoId, title, embedIframe }) {
    try {
      const params = new URLSearchParams()
      params.append('title', title)
      params.append('embedIframe', embedIframe)

      await this.$videoApi.admin.editVideo(videoId, params)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteVideo(context, { videoId }) {
    try {
      await this.$videoApi.admin.deleteVideo(videoId)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
