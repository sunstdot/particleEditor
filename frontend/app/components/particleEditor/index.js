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
        showModal:false
    },
    components:{
        'v-header':Header,
        'v-loginModal':Login,
        'v-physicalControl':PhysicalControl,
        'v-ParticleControl':ParticleControl,
        'v-displayArea':DisplayArea,
        'v-timelineArea':TimelineArea
    },
    events:{
        //'show-popup'(info){
        //    this.popupdata = {
        //        "title":info.title,
        //        "isshow":true,
        //        "content":info.content,
        //        "iserror":info.iserror,
        //        "onconfirm":info.onconfirm
        //    }
        //},
        'show-loginPanel'(){
            this.showModal = this.store.actions.login;
        }
    },
    method:{
        fetchWork(){

        },
        updateWork(){

        }
    }
}
