/**
 * Created by sunshitao on 2016/6/27.
 */
var component = {};
var Vue = require("vue").default;
var registerHtml = require('./register.html');
import "../loginComponent/registerLogin.css"

let dataModel = {
    name:"用户名",
    pwd:"密码",
    email:"邮箱",
    btname:"注册"
}

function init(){

}
function vueInit(){
    var registerComponent = Vue.extend({
        template:registerHtml,
        data:function(){
            return dataModel;
        }
    });
    //Vue.component('register-component',registerComponent);
    var vm = new Vue({
        el:'#registerContainer',
        data:{
        },
        components: {
            'v-register': registerComponent
        },
        methods:{
            doRegister:function(){
                var form = document.getElementById('registerForm');
                form.submit();
            },
            doClose:function(){
                console.log("todo close op");
            },
            checkName:function(){
                var value = this.value();
                if(!value){
                    //todo 请求数据库进行唯一性校验
                    console.log("------checkName");
                }
            },
            checkPwd:function(){
                var value = this.value();
                if(value.length > 12 && value.length < 6){
                    console.log("----------checkPwd");
                }
            },
            checkEmail:function(){
                var value = this.value();
                var mailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if(!value){
                  if(!mailReg.test(value)) console.log("error");
                }
            }
        }
    })
}

component.exec = function(){
    init();
    vueInit();
}
module.exports = component;
