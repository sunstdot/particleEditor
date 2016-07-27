import Vue from 'vue'

//components
import Header from './header';

export default {
    el:'body',
    data:{

    },
    components:{
        'v-header':Header
    },
    events:{
        'show-popup'(info){
            this.popupdata = {
                "title":info.title,
                "isshow":true,
                "content":info.content,
                "iserror":info.iserror,
                "onconfirm":info.onconfirm
            }
        }
    },
    method:{
        fetchWork(){

        },
        updateWork(){

        }
    }
}
