/**
 * Created by sunshitao on 2016/6/27.
 */
var component = {};
var Vue = require("vue").default;
var registerHtml = require('./register.html');
import {salt} from "../../util/safty"
import "../loginComponent/registerLogin.css"
var md5 = require(".././md5.min.js");
let dataModel = {
    name:"用户名",
    pwd:"密码",
    email:"邮箱",
    btname:"注册"
}

var registerWrapper;
function successFunc(data){
    console.log(data);
}
function init(){

}
function vueInit(){
    var registerComponent = Vue.extend({
        template:registerHtml,
        data:function(){
            return dataModel;
        },
        methods:{
            doRegister:function(event){
                event.preventDefault();
                //var form = document.getElementById('registerForm');
                console.log(this.password);
                var passwordHash = md5(salt(this.password));
                var url = "http://localhost:1337/register";
                var data = {
                    username:this.username,
                    password:passwordHash,
                    email:this.email
                };
                //form.submit();
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    success: successFunc,
                    dataType: 'json'
                });
            },
            doRegisterClose:function(event){
                event.preventDefault();
                registerWrapper.style.display = "none";
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
        }
    })
}

export default function register(){
    registerWrapper = document.getElementById('registerContainer');
    if(registerWrapper.style.display === "none"){
        registerWrapper.style.display = "block";
    }
    vueInit();
}
