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
        refreshStats(): void
    }
}

const Home = Vue.extend({
    components: {
        'network': Network,
        'pool': Pool
    },
    template: `
        <div class="container">
            <div class="alert alert-success" role="alert">
                Last update:
                {{getLastUpdate()}}
            </div>
            <div class="row">
                <div class="col">
                    <network 
                        :stats="stats"
                        v-on:refresh="refreshStats"
                    ></network>
                </div>
                <div class="col">
                    <pool 
                        :stats="stats"
                        v-on:refresh="refreshStats"
                    ></pool>
                </div>
            </div>
        </div>`,
    computed: Vuex.mapState({
        stats: state => (<IAppState>state).stats,
        live_stats: state => (<IAppState>state).live_stats
    }),
    mounted(){
        this.refreshStats();
    },
    methods : {
        refreshStats(){
            this.$store.dispatch('getStats');
            this.$store.dispatch('getLiveStats');
        },
        requestStats(){
            this.$store.dispatch('getStats');
        },
        requesLivestats(){
            this.$store.dispatch('getLiveStats');
        },
        getLastUpdate(){
            var d = new Date(this.stats.timestamp_received);
            return d.toDateString() + ', ' + d.toLocaleTimeString();
        }
    }
});

export default Home;