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
    data:{
    },
    components:{
        'v-header':Header,
        'v-login':Login,
        'v-physicalcontrol':PhysicalControl,
        'v-particlecontrol':ParticleControl,
        'v-displayarea':DisplayArea,
        'v-timelinearea':TimelineArea
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
