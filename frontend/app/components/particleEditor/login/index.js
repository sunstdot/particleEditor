import Vue from 'vue'
import template from './login.html';

export default Vue.component('v-login',{
    data(){
        return {
            word: 'welcome',
            name: '用户名',
            pwd: '密码',
            username: null,
            password: null,
            btname:'登录',
            showModal:true,
            user:this.$select('session')
        };
    },
    template,
    ready(){
        //this.$dispatch('show-loginPanel',{show:true});
        this.unwatch = this.$watch('session',this.close);
    },
    methods:{
        login(event){
            event.preventDefault();
            if(!this.username || !this.password){
                alert('用户名和密码不能为空');
            }
            store.dispatch(store.actions.session.create({
                name:this.username,
                password:this.password
            }));
            //this.showModal = false;
            //this.$dispatch('show-loginPanel',{})
        },
        close(){
            console.log('do close operation');
            this.$dispatch('show-loginPanel',{show:true});
        }
    }
})
