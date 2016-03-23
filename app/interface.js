/**
 * 接口调用做一层封装
 * Created by sunshitao on 2016/3/17.
 */
define(function (require, exports, module) {

    var http = require("../driver/http/json");

    function send(options,callback){
        var param = options.data;
        var method = options.method || "POST";
        var timeout = options.timeout || 20000;
        var withCredentials = options.withCredentials;
        var url = options.url;
        var t = new Date();


        if(!url){
            return;
        }

        var opt = {
            data: param,
            method: method,
            withCredentials: withCredentials,
            timeout: timeout,
            memory: options.memory,
            encodeFn: options.encodeFn,
            headers:{
                requestType:"login"
            },
            onsuccess:function(xhr,data){
                if (new Date() - t > 5000) {
                    new Error('RemoteInterface [' + url + '] timeout.');
                }
                if(callback){
                    callback(data)
                }
            },
            onfailure:function (xhr, data) {
                //检查数据格式是否正确
                new Error('RemoteInterface onfailure url: ' + url);
                if (callback) {
                    callback(data || {
                        code:'E00000'
                    });
                }
            }
        };

        http(url,opt);
    }

    module.exports = send;
    
});
