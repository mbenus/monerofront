System.register(["vue", "./userstats"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, userstats_1, Users;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (userstats_1_1) {
                userstats_1 = userstats_1_1;
            }
        ],
        execute: function () {
            Users = vue_1.default.extend({
                components: {
                    'userstats': userstats_1.default
                },
                template: "\n    <div class=\"stats\">\n        <div class=\"input-group\">\n            <input class=\"form-control\" type=\"text\" placeholder=\"Enter Your Address\" id=\"txtAddress\">\n            <span class=\"input-group-btn\">\n                <button class=\"btn btn-default\" type=\"button\" v-on:click=\"lookupAddress($event)\">\n                    <span style=\"display: inline;\"><i class=\"fa fa-search\"></i>Lookup</span>\n                    <span style=\"display: none;\"><i class=\"fa fa-refresh fa-spin\"></i> Searching...</span>\n                </button>\n            </span>\n        </div>\n        <div id=\"addressError\" style=\"display: none;\"></div>\n        <div v-if=\"showMe()\">\n            <userstats \n                v-for=\"user in users\" \n                :user=\"user\" \n                :key=\"user.xmraddress\"\n                v-on:deleteUserData=\"deleteUserData\"\n            ></userstats>\n        </div>\n    </div>",
                props: ['users'],
                mounted: function () {
                    this.$txtAddress = $(this.$el).find('#txtAddress');
                },
                created: function () {
                    var _this = this;
                    if (this.ready(this.users)) {
                        this.users.forEach(function (user) {
                            _this.requestUserData(user.xmraddress);
                        });
                    }
                },
                watch: {
                    'users': function (to, from) {
                    }
                },
                methods: {
                    showMe: function () {
                        return this.ready(this.users);
                    },
                    ready: function (variable) {
                        return (variable !== undefined && variable !== null);
                    },
                    lookupAddress: function (ev) {
                        ev.preventDefault();
                        this.requestUserData(this.$txtAddress.val());
                    },
                    deleteUserData: function (xmraddress) {
                        this.$emit('deleteUserData', xmraddress);
                    },
                    requestUserData: function (xmraddress) {
                        this.$emit('requestUserData', xmraddress);
                    }
                }
            });
            exports_1("default", Users);
        }
    };
});
//# sourceMappingURL=users.js.map