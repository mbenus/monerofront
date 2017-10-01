import Vue from 'vue'
import { formatdata } from "./../common/mixins"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        rawblocks: string[]
        blocks: Block[]
        config: any

        networkheight: number
        // computed properties

        // methods
        parseBlock(height: string, rawblock: string) : Block
    }
}

const PoolBlocks = Vue.extend({
    mixins: [formatdata],
    template: `
        <div class="poolblocks">
            <h4>Blocks</h4>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><i class="fa fa-bars"></i> Height</th>
                            <th title="How many more blocks network must mine before this block is matured"><i class="fa fa-link"></i> Maturity</th>
                            <th><i class="fa fa-unlock-alt"></i> Difficulty</th>
                            <th><i class="fa fa-paw"></i> Block Hash</th>
                            <th><i class="fa fa-clock-o"></i> Time Found</th>
                            <th><i class="fa fa-star-half-o"></i> Luck</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="block in blocks" :title="block.status">
                            <td>{{block.height}}</td>
                            <td>{{block.maturity}}</td>
                            <td>{{block.difficulty}}</td>
                            <td v-html="formatBlockLink(block.hash)"></td>
                            <td>{{formatTimestamp(block.time)}}</td>
                            <td v-html="formatLuck(block.difficulty, block.shares)"></td>
                        </tr>
                        <tr v-if="blocks.length===0"><td colspan="6">Er zijn nog geen blocks gemined door {{this.poolHost}}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        `,
    props : ['networkheight', 'config', 'rawblocks'],
    computed : {
        blocks(){
            var blocks : Block[] = [];
            for (var i=0; i< this.rawblocks.length; i+=2){
                var block = this.parseBlock(this.rawblocks[i + 1], this.rawblocks[i]);
                blocks.push(block);
            }
            return blocks;
        },
        rawblocks_testdat(){ // dummy/testdata zoals deze wordt teruggegeven door de backend
            return [
                "f55af1d465f6dadbbcad3c2fb390be0576ad204078166d17dc793e44e77e652a:1506303218:30893888424:28454155708:0:6464804964959",
                "1406471",
                "9fc5eb9974bc2e857480d74389989115062644c9c0eb3611866328115de92e61:1503437262:18295909800:42044086075:0:6964376764587",
                "1382462",
                "5dbd218a4bed67b8c4ea145481b2c06ec37187f323d9e08d80713cd215e4ebb4:1501773133:16981806477:22350815262:0:6829955754399",
                "1368574",
                "4c515ffe4b9d380216b39dce44534249f3535240e75d78905a6075ad7c46cf3e:1501363944:16537334072:3067746010:0:6902630001882",
                "1365155",
                "6bc8a720cfde659f9248b99022a36f987d9c4bdf0438a9668502540398e6d069:1501280579:16277321208:2607701393:0:6993670986757",
                "1364453",
                "1e029e869eeccdc3d8fe357fb12aa88e087ab5f16ba73b8192b583532069d805:1501222691:18107518318:3002950977:0:6904376692479",
                "1363976",
                "b8b93c23290e9d421a63357dd8de0b7c8b70cb13c18bb738cab88e864679559c:1501157787:16294140742:858491102:0:6911498402696",
                "1363435",
                "1a4dd7d9a42b47203d673f8a9844a87c697012b96985b091079738678dd40ff0:1501139216:16979933536:22780381464:0:6885155464907",
                "1363265",
                "7215dbaa3a265ae4d8d59860bd5a8e7f6d68b8764a774dc6427980770dc3f350:1497337975:9973113216:3648506908:0:7417401084651",
                "1331440"
              ]
        }
    },
    methods : {
        showMe(){
            return (this.rawblocks !== undefined && this.rawblocks !== null);
        },
        parseBlock(height: string, rawblock: string){
            // terribly uggly!!!!
            var parts = rawblock.split(':');
            var block:Block = {
                height: parseInt(height),
                hash: parts[0],
                time: parseInt(parts[1]),
                difficulty: parseInt(parts[2]),
                shares: parseInt(parts[3]),
                orphaned: parseFloat(parts[4]),
                reward: parseFloat(parts[5])
            };
            
            var toGo = this.config.depth - (this.networkheight - block.height);
            block.maturity = toGo < 1 ? '' : (toGo + ' to go');
    
            switch (block.orphaned){
                case 0:
                    block.status = 'unlocked';
                    break;
                case 1:
                    block.status = 'orphaned';
                    break;
                default:
                    block.status = 'pending';
                    break;
            }
            return block;
        },
        formatLuck(difficulty, shares){
            let accurateShares;
            if (this.config.slushMiningEnabled) {
                accurateShares = 1/this.config.blockTime * (
                    shares * this.config.weight * (
                        1 - Math.pow(
                                Math.E,
                                ((- this.config.blockTime) / this.config.weight)
                            )
                    )
                );
            }
            else {
                accurateShares = shares;
            }

            if (difficulty > accurateShares){
                var percent = 100 - Math.round(accurateShares / difficulty * 100);
                return '<span class="luckGood">' + percent + '%</span>';
            }
            else{
                var percent = (100 - Math.round(difficulty / accurateShares * 100)) * -1;
                return '<span class="luckBad">' + percent + '%</span>';
            }
        }
    
    }
});
    
export default PoolBlocks;