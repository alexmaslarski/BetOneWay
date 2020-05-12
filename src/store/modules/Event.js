import axios from 'axios'
import 'firebase/firestore'
import { db } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
const state = {
  event: {},
  markets: [],
  eventPosts: []
};

const getters = {
  getEvent: state => {
    return state.event
  },
  getMarkets: state => {
    return state.markets
  },
  getEventPosts: state => {
    return state.eventPosts
  }
}

const mutations = {
  'UPDATE_EVENT': (state, event) => {
    state.event = event;
  },
  'GROUP_MARKETS': (state, payload) => {
    state.markets = payload;
  }
}

const actions = {
  async loadEvent ({commit, dispatch}, id) {
    let response;
    dispatch('loadEventPosts', id)
    await dispatch('loadEventLine', id).then((res) => {
      response = res;
    })
    if(response.data.body.game_id) {
      response.data.body.in_play = false;
      commit('UPDATE_EVENT', response.data.body);
      dispatch('groupMarkets')
      return true
    }else {
      return await dispatch('loadEventLive', id)
    }
  },
  loadEventLine: (context, id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/event/${id}/list/line/en/`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err);
          reject()
        })
    })
  },
  loadEventLive: ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/event/${id}/list/live/en/`)
        .then((res) => {
          res.data.body.in_play = true;
          commit('UPDATE_EVENT', res.data.body, 'live');
          dispatch('groupMarkets')
          resolve(res)
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
  },
  loadEventPosts: firestoreAction(({ bindFirestoreRef}, payload) => {    
    bindFirestoreRef('eventPosts', db.collection('posts').where('eventIDs', 'array-contains', payload.toString()));
  })
}

export default {
  state,
  getters,
  mutations,
  actions
};