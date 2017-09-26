import Vue from 'vue'

const About = Vue.extend({
    template: `<div><h1>About</h1><router-link to="/home">Ga naar Home</router-link></div>`,
    created : function(){

    }
});

export default About;