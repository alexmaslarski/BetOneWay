import axios from 'axios'
const state = {
  event: {}
};

const getters = {
  getEvent: state => {
    return state.event
  }
}

const mutations = {
  'UPDATE_EVENT': (state, payload) => {
    state.event = payload;
  }
}

const actions = {
  loadEvent: ({commit}, id) => {
    axios.get(`/event/${id}/list/line/en/`)
      .then(res => {
        console.log(res);
        commit('UPDATE_EVENT', res.data.body);
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};