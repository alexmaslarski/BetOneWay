const state = {
  user: null,
  betslip: []
}

const mutations = {
  'UPDATE_USER': (state, payload) => {
    state.user = payload;
  },
  'UPDATE_BETSLIP': (state, payload) => {
    state.user = payload;
  }
}
const getters = {
  getUser: state => {
    return state.user;
  },
  getBetSlip: state => {
    return state.betslip;
  }
}

const actions = {
  updateUser: ({commit}, user) => {
    commit('UPDATE_USER', user);
  },
  updateBetSlip: ({commit}, user) => {
    commit('UPDATE_BETSLIP', user);
  }
}

export default {
  state,
  mutations,
  actions,
  getters
};