import Vue from 'vue'

//components
import Header from './header';
import Login from './login'
import PhysicalControl from './physicalControl'
import ParticleControl from './particleControl'
import DisplayArea from './displayArea'
import TimelineArea from './timelineArea'

export default {
    el:'body',
    data(){
        return{
            'parentText':''
        }
    },
    components:{
        'v-header':Header,
        'v-login':Login,
        'v-physicalcontrol':PhysicalControl,
        'v-particlecontrol':ParticleControl,
        'v-displayarea':DisplayArea,
        'v-timelinearea':TimelineArea
    },
    ready(){
        this.unwatch = this.$watch('parentText',function(){
            console.log("----------1111"+this.parentText);
        });
    },
    events:{
        'show-loginPanel'(info){
            this.showModal = info.show;
        }
    },
    methods:{
        fetchWork(){

        },
        updateWork(){

        }
    }
}
