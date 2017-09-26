import _ from "lodash";

export default {
    // STATS
    ["STATS"](state: IAppState, data: any) {
        state.stats = data.stats;
    },
    ["STATS_STARTED"](state: IAppState) {
    
    },
    ["STATS_FINISHED"](state: IAppState) {
        
    },
    ["STATS_NORESPONSE"](state: IAppState) {

    },
    ["STATS_FAIL"](state: IAppState, response: any) {
        state.errorResponse = response;
    },
    // LIVE_STATS
    ["LIVESTATS"](state: IAppState, data: any) {
        state.live_stats = data.livestats;
    },
    ["LIVESTATS_STARTED"](state: IAppState) {
        
    },
    ["LIVESTATS_FINISHED"](state: IAppState) {
        
    },
    ["LIVESTATS_NORESPONSE"](state: IAppState, response: any) {

    },
    ["LIVESTATS_FAIL"](state: IAppState, response: any) {
        state.errorResponse = response;
    },
    //USERDATA
    ["USERDATA"](state: IAppState, params: any) {

        let userstats: IUserStats = params.userdata,
            xmraddress: string = params.xmraddress;
        
        let users = (state.users === null || state.users === undefined)?[]:_.clone(state.users);
        
        // try to pick the user from the state
        let user = _.find(users, (user) => {
            return user.xmraddress === xmraddress;
        });


        if (!user){
            // add user
            user = <User>{ xmraddress : xmraddress };
            users.push(user);
        }
        
        // update user
        user.userstats = userstats;
        
        // update state once! (for 1 repaint)
        state.users = users;
    },
    ["USERDATA_DELETE"](state: IAppState, xmraddress: string) {
        const index = _.findIndex(state.users, (user) => {
            return user.xmraddress === xmraddress;
        });

        if (index !== -1){
            state.users.splice(index, 1);
        }
    },
    ["USERDATA_STARTED"](state: IAppState) {
        
    },
    ["USERDATA_FINISHED"](state: IAppState) {
        
    },
    ["USERDATA_NORESPONSE"](state: IAppState, response: any) {

    },
    ["USERDATA_FAIL"](state: IAppState, response: any) {
        
    }
}