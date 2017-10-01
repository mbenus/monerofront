import _ from "lodash";

var init_userstats = function(stats: IUserStat){
    // the api doest return all posible fields when that data isnt available.
    // Initialize this data with 0
    let dat: IUserStat = {
        balance : 0,
        hashes : 0,
        hashrate: "0",
        paid: 0,
        lastShare: 0
    };

    if (stats){
        dat.balance = stats.balance || 0;
        dat.hashes = stats.hashes || 0;
        dat.hashrate = stats.hashrate || "0";
        dat.paid = stats.paid || 0;
        dat.lastShare = stats.lastShare || 0;
    }
    return dat;
};

export default {
    // STATS
    ["STATS"](state: IAppState, data: any) {
        const stats : Stats = data.stats;
        // add some own data
        stats.timestamp_received = Date.now();
        state.stats = stats;
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

        // initialize data that wasnt returned by the backend
        userstats.stats = init_userstats(userstats.stats);
        
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