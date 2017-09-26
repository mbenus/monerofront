import Vue from 'vue'
import Vuex from 'vuex'

import Users from "./users"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {

        // computed properties
        users: [IUser]
    }
}

const Statistics = Vue.extend({
    components: {
        'users': Users
    },
    template: `
        <div>
            <h1>Your Statistics &amp; Payment History</h1>
            <users 
                :users="users"
                v-on:requestUserData="requestUserData"
                v-on:deleteUserData="deleteUserData"
            ></users>
        </div>`,
    computed: Vuex.mapState({
        users : state => (<IAppState>state).users,
    }),
    methods : {
        requestUserData(xmraddress: string){
            
            let params = {
                force: true,
                xmraddress : xmraddress
            }
            this.$store.dispatch('getUserData', params);
        },
        deleteUserData(xmraddress: string){
            this.$store.dispatch('deleteUserData', xmraddress);
        }
    }
});

export default Statistics;