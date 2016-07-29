import Vue from 'vue'
import template from './login.html';

export default Vue.component({
    data(){
        return {
            word: 'welcome',
            name: '�û���',
            pwd: '����',
            username: null,
            password: null,
            btnname:'��¼',
            type: 'login'
        };
    },
    template,
    method:{
        login(event){
            event.preventDefault();
            if(!this.username || !this.password){
                alert('�û���������δ��д');
            }
            store.dispatch(store.actions.session.create({
                name:this.name,
                password:this.password
            }));
            this.$dispatch('show-loginPanel',{})
        }
    }
})
