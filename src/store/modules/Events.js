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
    axios.get('/events/1/0/sub/20/line/en')
      .then(res => {
        console.log(res.data.body);
        commit('UPDATE_TOURNAMENTS', res.data.body);
        console.log(state.tournaments);
        
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