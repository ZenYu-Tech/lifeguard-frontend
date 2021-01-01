/**
 * @typeof Video
 * @type {object}
 * @property {string} videoId
 * @property {string} title
 * @property {string} videoUrl
 * @property {number} sort
 * @property {boolean} show
 * @property {date} createdAt
 */

const state = () => ({
  /**
   * @type {Array<Video>}
   */
  videos: [
    {
      videoId: 1,
      title: '跳水教學1',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 6,
      createdAt: new Date()
    },
    {
      videoId: 2,
      title: '跳水教學2',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 2,
      createdAt: new Date()
    },
    {
      videoId: 3,
      title: '跳水教學3',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 3,
      createdAt: new Date()
    },
    {
      videoId: 4,
      title: '跳水教學4',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 4,
      createdAt: new Date()
    },
    {
      videoId: 5,
      title: '跳水教學5',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 5,
      createdAt: new Date()
    },
    {
      videoId: 6,
      title: '跳水教學6',
      videoUrl: 'https://www.youtube.com/embed/fNjetBSY8HY',
      sort: 1,
      createdAt: new Date()
    }
  ]
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
  async fetchVideos({ commit }) {
    try {
      const { data } = await this.$videoApi.fetchVideos()
      commit('SET_videos', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
