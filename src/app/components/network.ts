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
            <h3>Monero Netwerk</h3> 
            <span><i class="fa fa-object-group fa-2x" aria-hidden="true"></i></span>
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
                Block gevonden:
                <span>{{formatTimestamp(stats.network.timestamp)}}</span>
            </div>
            <div>
                <i class="fa fa-unlock-alt"></i>
                Moeilijkheidsgraad:
                <span>{{stats.network.difficulty}}</span></div>
            <div>
                <i class="fa fa-bars"></i>
                Blockhoogte:
                <span>{{stats.network.height}}</span>
            </div>
            <div>
                <i class="fa fa-money"></i>
                Laatste beloning:
                <span>{{getReadableCoins(stats.network.reward, 4)}}</span>
            </div>
            <div>
                <i class="fa fa-paw"></i>
                Laatste hash:
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