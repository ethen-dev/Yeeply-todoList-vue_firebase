import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        panelActive: '',
        panelOpen: false,
        tabActiveId: ''
    },
    mutations: {
        setPanelActive(state, value) {
            state.panelActive = value;
        },
        setPanelOpen(state, value) {
            state.panelOpen = value;
        },
        setTabActiveId(state, value) {
            state.tabActiveId = value;
        }
    },
    actions: {}
});
