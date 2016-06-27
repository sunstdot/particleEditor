/**
 * Created by sunshitao on 2016/6/27.
 */
var component = {};
var Vue = require("vue")
var registerLoginCss = require('./registerLoginCss');

function init(){

}
function vueInit(){
    var vm = new Vue({
        el:'#registerContainer',
        data:{
            branches:[dataModel]
        }
        
    })
}

component.exec = function(){
    init();
    vueInit();
}
