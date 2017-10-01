import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Pool from "./../components/pool"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {

        // computed properties
        stats: any

        // methods 
        refreshStats(): void
    }
}

const Poel = Vue.extend({
    components: {
        'poel': Pool
    },
    template: `
        <div>
            <poel 
                :stats="stats"
                v-on:refresh="refreshStats"
            ></poel>
            <div class="alert alert-success" role="alert" v-if="stats.timestamp_received">
                Laatst bijgewerkt op:
                {{getLastUpdate()}}
            </div>
        </div>`,
    computed: Vuex.mapState({
        stats: state => (<IAppState>state).stats
    }),
    created(){
        this.refreshStats();
    },
    watch : {
        '$route'(to: VueRouter.Route, from: VueRouter.Route) {
            this.refreshStats();
        },
    },
    methods : {
        refreshStats(){
            this.$store.dispatch('getStats');
        },
        getLastUpdate(){
            var d = new Date(this.stats.timestamp_received);
            return d.toDateString() + ', ' + d.toLocaleTimeString();
        }
    }
});

export default Poel;