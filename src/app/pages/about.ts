import Vue from 'vue'

const About = Vue.extend({
    template: `
        <div class="card">
            <div class="card-header">
                <h3>About</h3>
                <span><i class="fa fa-newspaper-o fa-2x" aria-hidden="true"></i></span>
            </div>
            <div class="card-body">
                Deze website is gebaseerd op de website van <a href="https://github.com/zone117x/node-cryptonote-pool">node-cryptonote-pool</a>
                De frontend is compleet vervangen. Op den duur zal ook de backend onder handen worden genomen.
                
                <p>Momenteel wordt er door de backend niet veel info vastgehouden. Daardoor zijn statistiek-informatie beperkt.
                Dit willen we gaan aanpakken, zodat ook de history van een miner terug kan worden bekeken
                </p>
                <p>
                    Uiteraard wordt de code hiervan beschikbaar gesteld op github.
                    Vooralsnog zijn we nog niet zover.

                </p>
                <p>
                    De poel is echter 100% functioneel!!
                </p>
                <h3>Help</h3>
                <p>Bij vragen of problemen, mail dan naar <a id="emailLink" href="mailto:support@moneropoel.nl">support@moneropoel.nl</a></p>
                <div>
                    <h3>Chat Room</h3>
                    <iframe id="kiwi_irc" style="border:0; width:100%; height:500px;" src="https://kiwiirc.com/client/irc.freenode.net/#monero-pools"></iframe>
                </div>
            </div>
        </div>`,
    created : function(){

    }
});

export default About;