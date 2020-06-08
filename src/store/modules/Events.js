import axios from 'axios'
import { db } from '@/helpers/firebaseConfig'
const state = {
  lineTournaments: [],
  liveTournaments: [],
  allTournaments: []
};

const getters = {
  // Get all tournaments
  getLineTournaments: state => {
    return state.lineTournaments
  },
  // Get events in tournament
  getLineTournamentEvents: state => id => {
    return state.lineTournaments.find(tournament => tournament.tournament_id === id);
  },
  // Get all tournaments live
  getLiveTournaments: state => {
    return state.liveTournaments
  },
  getLiveEventsList: state => {
    let eventList = [];
    state.liveTournaments.forEach(tournament => {
      tournament.events_list.forEach( event => {
        eventList.push(event);
      })
    });
    return eventList;
  },
  getHotEventsList: state => {
    let eventList = [];
    state.allTournaments.forEach(tournament => {
      tournament.events_list.forEach( event => {
        if(event.posts_count > 0){
          eventList.push(event);
        }
      })
    });
    eventList.sort((a, b) => {a.posts_count - b.posts_count})
    return eventList;
  },
  // Get events in tournament live
  getLiveTournamentEvents: state => id => {
    return state.liveTournaments.find(tournament => tournament.tournament_id === id);
  },
  // Get all tournaments live
  getAllTournaments: state => {
    return state.allTournaments
  },
  // Get events in tournament live
  getAllTournamentEvents: state => id => {
    return state.allTournaments.find(tournament => tournament.tournament_id === id);
  }
}

const mutations = {
  'UPDATE_ALL_EVENTS': (state, payload) => {
    state.allTournaments = payload;
  },
  'UPDATE_LINE_EVENTS': (state, payload) => {
    state.lineTournaments = payload;
  },
  'UPDATE_LIVE_EVENTS': (state, payload) => {
    state.liveTournaments = payload;
  }
}

const actions = {
  loadLineEvents: ({commit}) => {
    return new Promise((resolve, reject) => {
      // events/sport(0=all, 1=football)/tournamentID(0=all)/sub items/line or live/ en
      axios.get('/events/1/0/sub/0/line/en')
        .then(res => {
          commit('UPDATE_LINE_EVENTS', res.data.body);
          resolve()
          
        })
        .catch(err => {
          console.log(err);
          reject();
        })
    })
  },
  loadLiveEvents: ({commit}) => {
    return new Promise((resolve, reject) => {
      // events/sport(0=all, 1=football)/tournamentID(0=all)/sub items/line or live/ en
      // loads live events
      axios.get('/events/1/0/sub/0/live/en')
        .then(res => {
          commit('UPDATE_LIVE_EVENTS', res.data.body);
          resolve()
          
        })
        .catch(err => {
          console.log(err);
          reject();
        })
    })
  },
  // loads both line and live events
  loadAllEvents: ({dispatch, commit, state}) => {
    return Promise.all([
      dispatch('loadLineEvents'),
      dispatch('loadLiveEvents')
    ]).finally(() => {
      let allEvents = state.lineTournaments.concat(state.liveTournaments);

      // merges live and line events in tournaments
      let output = allEvents.reduce(function(o, cur) {
        // Get the index of the key-value pair.
        var occurs = o.reduce(function(n, item, i) {
          return (item.tournament_id === cur.tournament_id) ? i : n;
        }, -1);
  
        // If the tournament_id is found,
        if (occurs >= 0) {
          // append the current value to its list of values.
          o[occurs].events_list = o[occurs].events_list.concat(cur.events_list);
          // Otherwise,
        } else {
          // add the current item to o
          var obj = {
            tournament_name: cur.tournament_name,
            tournament_id: cur.tournament_id,
            events_list: cur.events_list
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);


        output.forEach((tournament, index, array) => {
          tournament.events_list.forEach(event => {
            dispatch('loadEventPostsCount', event.game_id)
            .then(res => {
              event.posts_count = res;
            })
            .finally(() => {
              
              if (index === array.length -1){
                console.log(index);
                commit('UPDATE_ALL_EVENTS', output);
              }
            })
          })
        })
      
      

    })
  },
  loadEventPostsCount: (context, payload) => {
    return db.collection('posts').where('eventIDs', 'array-contains', payload.toString()).get()
    .then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      return documents.length;
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};