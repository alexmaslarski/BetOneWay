const state = {
  user: null
}

const mutations = {
  'UPDATE_USER': (state, payload) => {
    state.user = payload;
  }
}
const getters = {
  getUser: state => {
    return state.user;
  }
}

const actions = {
  updateUser: ({commit}, user) => {
    commit('UPDATE_USER', user);
  }
}

export default {
  state,
  mutations,
  actions,
  getters
};