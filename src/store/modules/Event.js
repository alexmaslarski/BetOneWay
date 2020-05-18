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
  // loads event
  async loadEvent ({commit, dispatch}, id) {
    let response;
    // first tries to load event as line
    dispatch('loadEventPosts', id)
    await dispatch('loadEventLine', id).then((res) => {
      response = res;
    })
    if(response.data.body.game_id) {
      response.data.body.in_play = false;
      commit('UPDATE_EVENT', response.data.body);
      dispatch('groupMarkets')
      return true
      // if event is not pre-match, it loads it as a live event
    }else { 
      return await dispatch('loadEventLive', id)
    }
  },
  // load pre-match event from api
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
  // loads live event from api
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
  // groups the markets from the response based on their market
  groupMarkets: ({commit, state}) => {
    let marketList = state.event.game_oc_list.reduce(function(h, obj) {
      h[obj.oc_group_name] = (h[obj.oc_group_name] || []).concat(obj);
      return h; 
    }, {});
    commit('GROUP_MARKETS', marketList);
  },
  // loads posts which include the event
  loadEventPosts: firestoreAction(({ bindFirestoreRef}, payload) => {    
    bindFirestoreRef('eventPosts', db.collection('posts').where('eventIDs', 'array-contains', payload.toString()).orderBy('bet.timeStamp', 'desc'));
  })
}

export default {
  state,
  getters,
  mutations,
  actions
};