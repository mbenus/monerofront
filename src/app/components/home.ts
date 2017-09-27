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
        <div class="row">
            <div class="col">
                <network :stats="stats"></network>
            </div>
            <div class="col">
                <pool :stats="stats"></pool>
            </div>
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