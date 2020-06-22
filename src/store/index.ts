import Vue from 'vue';
import Vuex from 'vuex';
import Peer from '@/peer/Peer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: Array<string>(),
    peer: new Peer(),
  },
  mutations: {
    message(state, message) {
      state.messages.push(message);
    },
    connect(state, connectionID: string) {
      console.log('store connecting to: ' + connectionID);
      state.peer.connect(connectionID);
    },
  },
  getters: {
    peerID: (state) => {
      return state.peer.getID();
    },
  },
});
