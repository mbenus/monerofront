import Vue from 'vue'

import { formatdata } from "./../common/mixins"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        coinUnits: number
        basehashUrl: string
        
        // computed properties
        stats: any

        // methods 
        getReadableHashRateString(difficulty: number)
        formatTimestamp(timestamp: number)
    }
}

const Network = Vue.extend({
    mixins: [formatdata],
    template: `
    <div class="network" v-if="showMe()">
        <h3>Networks</h3>
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
    </div>`,
    props : ['stats'],
    methods : {
        showMe(){
            return (this.stats !== undefined && this.stats !== null);
        }
    }
});

export default Network;