import axios from 'axios'
const state = {
  tournaments: []
};

const getters = {
  getTournaments: state => {
    return state.tournaments
  },
  getTournamentEvents: state => id => {
    return state.tournaments.find(tournament => tournament.tournament_id === id);
  }
}

const mutations = {
  'UPDATE_TOURNAMENTS': (state, payload) => {
    state.tournaments = payload;
  }
}

const actions = {
  loadTournaments: ({commit}) => {
    return new Promise((resolve, reject) => {
      axios.get('/events/1/0/sub/20/line/en')
        .then(res => {
          commit('UPDATE_TOURNAMENTS', res.data.body);
          resolve()
          
        })
        .catch(err => {
          console.log(err);
          reject();
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};