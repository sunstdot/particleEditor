import Vue from 'vue'
import template from './login.html';

export default Vue.component({
    data(){
        return {
            word: 'welcome',
            name: '用户名',
            pwd: '密码',
            username: null,
            password: null,
            btnname:'登录',
            type: 'login'
        };
    },
    template,
    method:{
        login(event){
            event.preventDefault();
            if(!this.username || !this.password){
                alert('用户名或密码未填写');
            }
            store.dispatch(store.actions.session.create({
                name:this.name,
                password:this.password
            }));
            this.$dispatch('show-loginPanel',{})
        }
    }
})
