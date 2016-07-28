import Vue from 'vue'

//components
import Header from './header';
import Login from './login'

export default {
    el:'body',
    data:{
        showModal:false
    },
    components:{
        'v-header':Header,
        'v-login':Login
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
        },
        'show-loginPanel'(info){
            this.loginPanel = {
                'isshow':this.store.actions.login,
                'content':info.content
            }
            this.showModal = info.state;
        }
    },
    method:{
        fetchWork(){

        },
        updateWork(){

        }
    }
}
