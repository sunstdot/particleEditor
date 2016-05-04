//登陆模板
define(function (require, exports, module) {
    var loginTpl = '<div class="wrapper">'+
            '<div class="closeBtn" v-on:click="doClose()"></div>'+
        '<div class="container" id="loginContainer">'+
        '<template v-for="branch in branches">'+
            '<div class="divform">'+
            '<h1>{{branch.word}}</h1>'+
            '<input type="text" v-model="username" placeholder="{{branch.name}}">'+
            '<input type="password" v-model="password" placeholder="{{branch.pwd}}">'+
            '<button type="submit" id="login-button" v-on:click="doLogin()">{{branch.btname}}</button>'+
            '</div>'+
        '</template>'+
        '</div>'+
        '<ul class="bg-bubbles">'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '<li></li>'+
        '</ul>'+
        '</div>';
    module.exports = loginTpl;

});

