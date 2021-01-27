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
  videos: []
})

const getters = {
  getVideos: state => state.videos.slice().sort((a, b) => a.sort - b.sort)
}

const mutations = {
  SET_videos(state, videos) {
    state.videos = videos
  }
}

const actions = {
  async fetchVideos({ commit }, { count, page }) {
    try {
      const { data } = await this.$videoApi.admin.fetchVideos(count, page)
      commit('SET_videos', data.result.videos)
    } catch (error) {
      console.error(error)
    }
  },
  async createVideo(context, { title, embedIframe }) {
    try {
      const params = new URLSearchParams()
      params.append('title', title)
      params.append('embedIframe', embedIframe)

      const { data } = await this.$videoApi.admin.createVideo(params)
      return data
    } catch (error) {
      console.error(error)
    }
  },
  async editVideo(context, { videoId, title, embedIframe }) {
    try {
      const params = new URLSearchParams()
      params.append('title', title)
      params.append('embedIframe', embedIframe)

      const { data } = await this.$videoApi.admin.editVideo(videoId, params)
      return data
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
