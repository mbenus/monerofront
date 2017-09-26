System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var requests, baseUrl, getdata;
    return {
        setters: [],
        execute: function () {
            requests = {};
            baseUrl = 'https://moneropoel.nl';
            getdata = function (commit, url, mutation, forceRefresh, params) {
                var requestid = (params && params.requestid) ? mutation + '_' + params.requestid : mutation;
                if (forceRefresh && requests[requestid] != null) {
                    console.log('Force new request for url "' + url + '"');
                    requests[requestid].abort();
                    delete requests[requestid];
                }
                if (requests[requestid] != null) {
                    console.log('Request "' + url + '" is still pending. No new one started');
                    return;
                }
                commit(mutation + '_STARTED');
                requests[requestid] = $.ajax({
                    url: url,
                    cache: false,
                    type: 'GET'
                })
                    .done(function (response) {
                    if (response) {
                        var p = (params) ? params : {};
                        p[mutation.toLowerCase()] = response;
                        commit(mutation, p);
                    }
                    else {
                        commit(mutation + '_NORESPONSE', response);
                    }
                })
                    .fail(function (response) {
                    commit(mutation + '_FAIL', response);
                })
                    .always(function () {
                    commit(mutation + '_FINISHED');
                    delete requests[requestid];
                });
            };
            exports_1("default", {
                getStats: function (_a, params) {
                    var commit = _a.commit;
                    var url = baseUrl + "/stats";
                    getdata(commit, url, 'STATS', (params && params.force));
                },
                getLiveStats: function (_a, params) {
                    var commit = _a.commit;
                    var url = baseUrl + "/live_stats";
                    getdata(commit, url, 'LIVESTATS', (params && params.force));
                },
                getUserData: function (_a, params) {
                    var commit = _a.commit;
                    var xmraddress = params.xmraddress;
                    var url = baseUrl + "/stats_address?address=" + xmraddress;
                    getdata(commit, url, 'USERDATA', (params && params.force), { xmraddress: xmraddress, requestid: xmraddress });
                },
                deleteUserData: function (_a, xmraddress) {
                    var commit = _a.commit;
                    commit('USERDATA_DELETE', xmraddress);
                }
            });
        }
    };
});
//# sourceMappingURL=actions.js.map