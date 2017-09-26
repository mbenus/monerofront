System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lodash_1, _a;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("default", (_a = {},
                _a["STATS"] = function (state, data) {
                    state.stats = data.stats;
                },
                _a["STATS_STARTED"] = function (state) {
                },
                _a["STATS_FINISHED"] = function (state) {
                },
                _a["STATS_NORESPONSE"] = function (state) {
                },
                _a["STATS_FAIL"] = function (state, response) {
                    state.errorResponse = response;
                },
                _a["LIVESTATS"] = function (state, data) {
                    state.live_stats = data.livestats;
                },
                _a["LIVESTATS_STARTED"] = function (state) {
                },
                _a["LIVESTATS_FINISHED"] = function (state) {
                },
                _a["LIVESTATS_NORESPONSE"] = function (state, response) {
                },
                _a["LIVESTATS_FAIL"] = function (state, response) {
                    state.errorResponse = response;
                },
                _a["USERDATA"] = function (state, params) {
                    var userstats = params.userdata, xmraddress = params.xmraddress;
                    var users = (state.users === null || state.users === undefined) ? [] : lodash_1.default.clone(state.users);
                    var user = lodash_1.default.find(users, function (user) {
                        return user.xmraddress === xmraddress;
                    });
                    if (!user) {
                        user = { xmraddress: xmraddress };
                        users.push(user);
                    }
                    user.userstats = userstats;
                    state.users = users;
                },
                _a["USERDATA_DELETE"] = function (state, xmraddress) {
                    var index = lodash_1.default.findIndex(state.users, function (user) {
                        return user.xmraddress === xmraddress;
                    });
                    if (index !== -1) {
                        state.users.splice(index, 1);
                    }
                },
                _a["USERDATA_STARTED"] = function (state) {
                },
                _a["USERDATA_FINISHED"] = function (state) {
                },
                _a["USERDATA_NORESPONSE"] = function (state, response) {
                },
                _a["USERDATA_FAIL"] = function (state, response) {
                },
                _a));
        }
    };
});
//# sourceMappingURL=mutations.js.map