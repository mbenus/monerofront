// store the requests in an object
// so we can abort the current request or skip the new request when an old one is still pending 
let requests = {};
const baseUrl = 'https://moneropoel.nl';

var getdata = function(commit, url: string, mutation: string, forceRefresh?: Boolean, params?: IrequestParams){
    
    const requestid = (params && params.requestid)?mutation + '_' + params.requestid:mutation;

    if (forceRefresh && requests[requestid] != null){
        // cancel the last request and force a refresh
        console.log('Force new request for url "' + url + '"');
        requests[requestid].abort();
        delete requests[requestid];
    }

    // skip request when it is still pending
    if (requests[requestid] != null){
        console.log('Request "' + url + '" is still pending. No new one started');
        return;
    }

    // start loading data
    commit(mutation + '_STARTED');
    
    // store the request so we can check if its still pending
    requests[requestid] = $.ajax({
        url: url,
        cache: false,
        type: 'GET'
    })
    .done(response => {
        if (response) {
            // commit data to store and pass also the request params
            // the store knows what was asked and received
            let p = (params)?params:{};   
            p[mutation.toLowerCase()] = response;
            commit(mutation, p);
        } else {
            // no data received?
            commit(mutation + '_NORESPONSE', response);
        }
    })
    .fail(response => {
        // service not available/unauthorized/etc
        commit(mutation + '_FAIL', response);
    })
    .always(() => {
        // done loading data
        commit(mutation + '_FINISHED');
        // remove the reference to the request, so a new request can be started
        delete requests[requestid];
    });
}

export default {
    getStats({ commit }, params) {
        const url = `${baseUrl}/stats`;
        getdata(commit, url, 'STATS', (params && params.force));
    },
    getLiveStats({commit}, params){
        const url = `${baseUrl}/live_stats`;
        getdata(commit, url, 'LIVESTATS', (params && params.force));
    },
    getUserData({commit}, params){
        const xmraddress = params.xmraddress;
        const url = `${baseUrl}/stats_address?address=${xmraddress}`;
        getdata(commit, url, 'USERDATA', (params && params.force), { xmraddress: xmraddress, requestid: xmraddress});
    },
    deleteUserData({commit}, xmraddress){
        commit('USERDATA_DELETE', xmraddress);
    }
}