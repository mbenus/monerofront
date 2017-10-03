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
            <h3>Getting started</h3>
            <span><i class="fa fa-rocket fa-2x" aria-hidden="true"></i></span>
        </div>
        <div class="card-body">
            <p>
                Minen is heel eenvoudig. <a href="https://getmonero.org/downloads/">Download</a> eerst de officiele monero-software en maak vervolgens een Portemonnee/Wallet aan.<br>
                Het adres van de portemonnee (een lange hash/tekenreeks) moet je vervolgens gebruiken in de configuratie van de mining-software zodat Moneropoel.nl je hierop kan uitbetalen.
            </p>

            <p> 
                Wil je niet zelf een wallet op je pc aanmaken, dan kan dat ook online zoals bij <a href="https://mymonero.com/">mymonero</a>
            </p>

            <h3>Aanmaken Portemonnee/Wallet</h3>
            <ul>
                <li><a target="_blank" href="http://monero.cc/getting-started/">Getting started with Monero</a></li>
                <li>Monero informatie en nieuws <a href="https://bitcointalk.org/index.php?topic=583449.0">BitcoinTalk announcement thread</a></li>
            </ul>
            <div class="miningsoftware">
                <h3>Mining software</h3>
                <p>
                    De software die je wilt gebruiken om te minen is geheel aan jezelf. Er zijn meerdere alternatieven, maar je moet wel diegene kiezen die voor jou van toepassing is.<br>
                    Je kan minen mbv de processor (CPU) of videokaart(GPU)<br>
                    Als je wilt minen met je videokaart, dan moet je mine-software gebruiken die je type videokaart ondersteunt. (AMD of NVIDIA) 
                </p>

                <p>
                    Sommige miners zijn geheel gratis te gebruiken en anderen gebruiken een deel van je rekenkracht om voor de bouwer van de software te minen.<br>
                    Als je wat kan missen, doneer dan een klein beetje naar de makers van de gratis tools. Zo blijven zij er energie in steken om de software nog beter te maken <br>
                    Vaak staat de software op Github.com met onderaan de pagina informatie hoe je het project financieel kan ondersteunen.
                </p>

                <div class="miners">
                    <h4>Aanbevolen miners</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th><i class="fa fa-book"></i> Naam</th>
                                <th><i class="fa fa-tty"></i> Type</th>
                                <th><i class="fa fa-download"></i> Downloads</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XMRig</td>
                                <td>CPU</td>
                                <td><a target="_blank" href="https://github.com/xmrig/xmrig/releases">Github</a></td>
                            </tr>
                            <tr>
                                <td>Claymore</td>
                                <td>CPU</td>
                                <td><a target="_blank" href="https://bitcointalk.org/index.php?topic=647251.0">BitcoinTalk</a></td>
                            </tr>
                            <tr>
                                <td>Claymore</td>
                                <td>AMD GPU</td>
                                <td><a target="_blank" href="https://bitcointalk.org/index.php?topic=647251.0">BitcoinTalk</a></td>
                            </tr>
                            <tr>
                                <td>xmrMiner</td>
                                <td>NVIDIA GPU</td>
                                <td><a target="_blank" href="https://github.com/xmrMiner/xmrMiner/releases">Github</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="startmining">
                <h3>Start mining</h3>
                Over het algemeen zijn de volgende parameters voldoende om te starten met minen
                <p class="mineexample">
                    MINER_PROGRAMMA -a cryptonight -o stratum+tcp://moneropoel.nl:3333 -u JE_WALLET_ADRES -p x
                </p>
                Controleer altijd de officiele parameters!!
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