import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import actions from "./actions"
import mutations from "./mutations"

// let users : User[] = [
//     {
//         xmraddress: "49gRw38h4CUserHfjTH4eifxXZRpDNRnDbUMqRkjktijxuqC1hvp5p2ARSSMiFjyEvdSJZEiSAkPM69YjNphyXzSfE13T6ucpDX",
//         userstats: null
//     }
// ];

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