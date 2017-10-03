import Vue from 'vue'
import Vuex from 'vuex'

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        
        $txtAddress: JQuery
        // props
        stats: any

        refreshUserData(): void
    }
}

const GettingStarted = Vue.extend({
    template: `
    <div class="user card"">
        <div class="card-header">
            <h3>Help</h3>
            <span><i class="fa fa-comments fa-2x" aria-hidden="true"></i></span>
        </div>
        <div class="card-body">
            <p>Bij vragen of problemen, mail dan naar <a id="emailLink" href="mailto:support@moneropoel.nl">support@moneropoel.nl</a></p>
            <div>
                <h3>Chat Room</h3>
                <iframe id="kiwi_irc" style="border:0; width:100%; height:500px;" src="https://kiwiirc.com/client/irc.freenode.net/#monero-pools"></iframe>
            </div>
        </div>
    </div>`,
    computed: Vuex.mapState({
        stats : state => (<IAppState>state).stats,
    }),
    methods : {
 
    }
});

export default GettingStarted;