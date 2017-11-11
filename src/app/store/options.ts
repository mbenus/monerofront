import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import actions from "./actions"
import mutations from "./mutations"

// default state
var appstate: IAppState = {
    stats : null,
    live_stats : null,
    errorResponse: null,
    users: [],
    priceData: {
        data : null,
        loading:false
    }
}

// list of vars that need to be written to localstorage (cached)
// graph data shouldnt be added
let appstateCached = ['stats', 'live_stats', 'users'];

var storeoptions: Vuex.StoreOptions<IAppState> = {
    plugins: [createPersistedState({paths : appstateCached})],
    state: appstate,
    actions: actions,
    mutations: mutations
}

export default storeoptions;