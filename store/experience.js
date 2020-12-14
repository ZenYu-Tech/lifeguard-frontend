const state = () => ({
  experience: {},
  experiences: []
})

const getters = {
  experience: state => state.experience,
  experiences: state => state.experiences
}

const mutations = {
  SET_experience(state, experience) {
    state.experience = experience
  },
  SET_experiences(state, experiences) {
    state.experiences = experiences
  }
}

const actions = {
  async getExperience({ commit }, id) {
    try {
      const { data } = await this.$experienceApi.getExperience(id)
      commit('SET_experience', data)
    } catch (error) {
      console.error(error)
    }
  },
  async getAllExperiences({ commit }) {
    try {
      const { data } = await this.$experienceApi.getAllExperiences()
      commit('SET_experiences', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export { state, getters, mutations, actions }
