/**
 * Created by sunshitao on 2016/3/11.
 */
define(function (require, exports, module) {
//    var request = require('./request');

    var request = function (url, options) {
//        if(options.dataType === "jsonp"){
//            return
//        }
        var xhr;
        function getXHR(){
            if(window.XMLHttpRequest){
                return new XMLHttpRequest();
            }
            if(window.ActiveXObject){
                try{
                    return new window.ActiveXObject("Msxml2.XMLHTTP");
                }catch (e){
                    try{
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    }catch (e){

                    }
                }
            }
        }

        function onreadystatechange(){
            if(xhr.readyState == 4){
                if(xhr.status )
            }
        }

    };


    module.exports = function (url, options) {
        if (options) {
            var onsuccess = options.onsuccess;
            options.onsuccess = function (xhr, data) {
                var obj = null;
                //如果data是字符串,进行解析
                if (Object.prototype.toString.call(data) === "[object String]") {
                    data = data.trim();
                    data.replace(/^[^\[\{]*([\[\{].*[\]\}]).*?$/, "$1");
                    try {
                        obj = JSON.parse(data);
                    } catch (e) {
                    }
                } else {
                    obj = data;
                }

                if (!obj) {
                    try {
                        obj = (new Function("return (" + data + ")"))();
                    } catch (e) {
                    }
                }
                if (onsuccess) {
                    onsuccess(xhr, obj);
                }
            }
        }
        request(url, options)
    };

});