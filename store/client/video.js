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
  getVideos: state => state.videos
}

const mutations = {
  SET_videos(state, videos) {
    state.videos = videos
  }
}

const actions = {
  async fetchVideos({ commit }) {
    try {
      const { data } = await this.$videoApi.fetchVideos()
      commit('SET_videos', data.result.videos)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
