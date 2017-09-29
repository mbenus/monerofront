import Vue from 'vue'

import { formatdata } from "./../common/mixins"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data propertiesS
        
        // computed properties
        stats: any

        // methods
        showMe(): boolean
    }
}

const Network = Vue.extend({
    mixins: [formatdata],
    template: `
    <div class="network card" v-if="showMe()">
        <div class="card-header">
            <span><i class="fa fa-object-group" aria-hidden="true"></i></span>
            <h3>Network</h3> 
            <span class="refresh button" v-on:click="refresh($event)"><i class="fa fa-refresh" aria-hidden="true"></i></span>
        </div>
        <div class="card-body">
            <div>
                <i class="fa fa-tachometer"></i>
                Hash Rate: 
                <span>{{getReadableHashRateString(stats.network.difficulty)}}</span>
            </div>
            <div>
                <i class="fa fa-clock-o"></i>
                Block Found:
                <span>{{formatTimestamp(stats.network.timestamp)}}</span>
            </div>
            <div>
                <i class="fa fa-unlock-alt"></i>
                Difficulty:
                <span>{{stats.network.difficulty}}</span></div>
            <div>
                <i class="fa fa-bars"></i>
                Blockchain Height:
                <span>{{stats.network.height}}</span>
            </div>
            <div>
                <i class="fa fa-money"></i>
                Last Reward:
                <span>{{getReadableCoins(stats.network.reward, 4)}}</span>
            </div>
            <div>
                <i class="fa fa-paw"></i>
                Last Hash:
                <a target="_blank" :href="getBlockHref(this.stats.network.hash)">{{getBlockLink(this.stats.network.hash)}}</a>
            </div>
        </div>
    </div>`,
    props : ['stats'],
    methods : {
        showMe(){
            return (this.stats !== undefined && this.stats !== null);
        },
        refresh(ev: Event){
            ev.preventDefault();
            this.$emit('refresh');
        },
    }
});

export default Network;