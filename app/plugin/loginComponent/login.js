/**
 * Created by sunshitao on 2016/3/10.
 */
var component = {};
var loginTpl = require('./logintpl');
var loginCss = require('./loginCss');
//var loginHtml = require('./loginCss.js');

var Vue = require('vue').default;

var httpInterface = require('../../interface');
var loginPanel;

function includeStyleElement(styles, styleId) {

    if (document.getElementById(styleId)) {
        return
    }
    var style = document.createElement("style");
    style.id = styleId;
//这里最好给ie设置下面的属性
    /*if (isIE()) {
     style.type = "text/css";
     style.media = "screen"
     }*/
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) { //for ie
        style.styleSheet.cssText = styles;
    } else {//for w3c
        style.appendChild(document.createTextNode(styles));
    }
}

//登陆注册事件绑定
function bindEvent() {
    console.log('heihei')
}

var dataModel = {
    word: "welcome",
    name: "用户名",
    pwd: "密码",
    btname: '登录'
};

//登陆框初始化
function vueInit() {

    //获取login.html并将其添加到div中
    //带提示栏的用户输入框
    var demo = new Vue({
        el: '#loginContainer',
        data: {
            branch: [dataModel],
            username: "",
            password: ""
        },
        //计算方法,详见http://cn.vuejs.org/guide/computed.html
        compute: {},
        methods: {
            doLogin: function () {
                //执行登陆操作
                var username = this.username;
                var password = this.password;

                if (username === '' || username.trim() === '' || password === '' || password.trim() === '') {
                    return;
                }
                console.log(username + "=========" + password);

                var param = {
                    username: username,
                    password: password
                };

                var options = {
                    data: param,
                    url: 'login'
                };
                //调用接口
                httpInterface(options);
            },
            doClose: function () {
                loginPanel.innerHtml = "";
            }
        }
    })
}

function init() {
    loginPanel = document.getElementById('loginPanel');
    loginPanel.innerHTML = loginTpl;
    includeStyleElement(loginCss, "loginStyle");
    vueInit();
}

component.exec = function () {
    init();
    bindEvent();
};


//==============================================================组件化探索===================================================================
//    //定义新元素
//    var XFooProto = Object.create(HtmlElement.prototype);
//    //生命周期相关
//    XFooProto.readyCallback = function(){
//        this.textContent = "i'm x-foo";
//    };
//    //设置js的方法
//    XFooProto.foo = function(){
//        console.log("foo() is called");
//    };
//
//    var XFoo = document.register('foo',{prototype:XFooProto});
//
//
//    //shadow dom 组件化开发,使用者只需要引入login.js和<div type="login"></div>就能完美实现登陆组件
//
//    //todo .css和.html文件分离处理就完美了！！  尝试本地开发，使用nodeJS读取login.html内容，上线后将模板与css等打包到一起
//
//    var node = document.querySelector("div");
//    var root = node.createShadowRoot();
//
//    root.innerHTML = loginTpl;  //将模板值付给textContent

/**组件化开发代码编写方式
 * 1.面向对象开发，提供良好的封装
 *
 * */
module.exports = component;