System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, About;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            About = vue_1.default.extend({
                template: "<div><h1>About</h1><router-link to=\"/home\">Ga naar Home</router-link></div>",
                created: function () {
                }
            });
            exports_1("default", About);
        }
    };
});
//# sourceMappingURL=about.js.map