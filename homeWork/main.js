var Vue = require("vue")
var VueRouter = require("vue-router")
var imgHtml = require('./imgHtml.html');
// 定义组件
var Home = Vue.extend({
    template: '<p>This is ImageList!</p>',      
	})

var ImageList = Vue.extend({
    template: '<p>This is ImageList!</p>'
})

var App = Vue.extend({});
var router = new VueRouter()
router.map({
    '/Home': {
        component: Home
    },
    '/ImageList': {
        component: ImageList
    }
})
router.start(App, '#app')