import Vue from 'vue'
import Vuex from 'vuex'

import Network from "./network"
import Pool from "./pool"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {

        // computed properties
        stats: any
        live_stats: any

        // methods 
        requestStats(): void
        requesLivestats():void
    }
}

const Home = Vue.extend({
    components: {
        'network': Network,
        'pool': Pool
    },
    template: `
        <div>
            <h1>Home</h1>
            <router-link to="/about">Ga naar About</router-link>
            <network :stats="stats"></network>
            <pool :stats="stats"></pool>
        </div>`,
    computed: Vuex.mapState({
        stats: state => (<IAppState>state).stats,
        live_stats: state => (<IAppState>state).live_stats
    }),
    mounted(){
        this.requestStats();
        this.requesLivestats();
    },
    methods : {
        requestStats(){
            this.$store.dispatch('getStats');
        },
        requesLivestats(){
            this.$store.dispatch('getLiveStats');
        }
    }
});

export default Home;