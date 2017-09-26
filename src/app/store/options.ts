import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import actions from "./actions"
import mutations from "./mutations"

// default state
var appstate: IAppState = {
    stats : null,
    live_stats : null,
    errorResponse: null,
    users: []
}

var storeoptions: Vuex.StoreOptions<IAppState> = {
    plugins: [createPersistedState()], //TODO: turn me on when the app is finished
    state: appstate,
    actions: actions,
    mutations: mutations
}

export default storeoptions;