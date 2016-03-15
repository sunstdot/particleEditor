/**
 * Created by sunshitao on 2016/3/10.
 */
define(function(require, exports, module){
    var component = {};
    var loginTpl = require('./logintpl');
    var loginHtml = require('./loginCss.js');

    var loginCss = require('./loginCss');


    function includeStyleElement(styles,styleId) {

        if (document.getElementById(styleId)) {
            return
        }
        var style = document.createElement("style");
        style.id = styleId;
//这里最好给ie设置下面的属性
        /*if (isIE()) {
         style.type = “text/css”;
         style.media = “screen”
         }*/
        (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
        if (style.styleSheet) { //for ie
            style.styleSheet.cssText = styles;
        } else {//for w3c
            style.appendChild(document.createTextNode(styles));
        }
    }

    //登陆注册事件绑定
    function bindEvent(){
        console.log('heihei')
    }

    var dataModel = {
        word:"welcome",
        name:"用户名",
        pwd:"密码",
        btname:'登录'
    };

    //登陆框初始化
    function vueInit(){

        //获取login.html并将其添加到div中

        var demo = new Vue({
            el:'#loginContainer',
            data:{
                branches:[dataModel],
                username:"",
                password:""
            },
            //计算方法,详见http://cn.vuejs.org/guide/computed.html
            compute:{

            },
            methods:{
                doLogin:function(){
                    //执行登陆操作
                    var username = this.username;
                    var password = this.password;

                    if(username === ''||username.trim() ||password === ''|| password.trim() === ''){
                        return;
                    }
                    console.log(username+"========="+password);

                    var param = {
                        username:username,
                        pwd:password
                    };



                    http.json('login',param);
                    //send login message to node

                }
            }
        })
    }


    function init(){
        var loginPanel = document.getElementById('loginPanel');
        loginPanel.innerHTML = loginTpl;

        var styles = loginCss;
        includeStyleElement(styles,"loginStyle");

        vueInit();
    }

    component.exec = function(){
        init();
        bindEvent();
    };

    module.exports = component;

});