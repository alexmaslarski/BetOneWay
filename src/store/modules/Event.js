import axios from 'axios'
const state = {
  event: {},
  markets: []
};

const getters = {
  getEvent: state => {
    return state.event
  },
  getMarkets: state => {
    return state.markets
  }
}

const mutations = {
  'UPDATE_EVENT': (state, payload) => {
    state.event = payload;
  },
  'GROUP_MARKETS': (state, payload) => {
    state.markets = payload;
  }
}

const actions = {
  loadEvent: ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/event/${id}/list/line/en/`)
        .then(res => {
          commit('UPDATE_EVENT', res.data.body);
          dispatch('groupMarkets')
          resolve()
        })
        .catch(err => {
          console.log(err);
          reject()
        })
    })
  },
    groupMarkets: ({commit, state}) => {
    let marketList = state.event.game_oc_list.reduce(function(h, obj) {
      h[obj.oc_group_name] = (h[obj.oc_group_name] || []).concat(obj);
      return h; 
    }, {});
    commit('GROUP_MARKETS', marketList);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};