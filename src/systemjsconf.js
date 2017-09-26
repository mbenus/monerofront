System.config({
    "defaultJSExtensions": true,
    map: {
        'lodash': '../node_modules/lodash'
    },
    "paths": {
        "lodash.merge" : "../node_modules/lodash.merge/index.js", //vuex-persistedstate dependency
        "object-path" : "../node_modules/object-path/index.js", //vuex-persistedstate dependency
        "vue": "../node_modules/vue/dist/vue.js",
        "vuex": "../node_modules/vuex/dist/vuex.min.js",
        "vue-router": "../node_modules/vue-router/dist/vue-router.min.js",
        "vuex-persistedstate": "../node_modules/vuex-persistedstate/dist/vuex-persistedstate.min.js"
    },
    packages: {
        'app': {
            format: 'system',
            defaultExtension: 'js'
        },
        lodash: {
            main: 'index.js',
            defaultExtension: 'js'
        }
    }
});
System.import('app/main.js').then(null, console.error.bind(console));