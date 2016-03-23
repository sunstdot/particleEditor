/**
 * Created by sunshitao on 2016/3/11.
 */
define(function (require, exports, module) {
//    var request = require('./request');

    var request = function (url, options) {
//        if(options.dataType === "jsonp"){
//            return
//        }
        var data = options.data,
            async = (options.async !== false),
            username = options.username || "",
            password = options.password || "",
            method = (options.method || "GET").toUpperCase(),
            headers = options.headers || {},
            timeout = options.timeout || 0;

        var xhr;
        var key;
        var withCredentials = options.withCredentials || false;
        //组装查询字符串参数,同时需要使用encodeURIComponent编码
        function _jsonToQuery(json) {
            var result = [], key;
            for (key in json) {
                if (json.hasOwnProperty(key)) {
                    result.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]));
                }
            }
            return result.join("&");
        }

        function getXHR() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            if (window.ActiveXObject) {
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {

                    }
                }
            }
        }

        function onreadystatechange() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    //消息响应成功
                } else {
                    new Error("the request is failed");
                }
            }
        }

        try {
            xhr = getXHR();

            if (data && data.toString.call(data) == "[object Object]") {
                data = _jsonToQuery(data);
            }
            if (method == "GET") {
                if (data) {
                    url += (url.indexOf("?") >= 0 ? '&' : '?') + data;
                    data = null;  //释放内存
                }
            }


            if("withCredentials" in xhr){
                xhr.withCredentials = withCredentials;
            }

            if(async){
                xhr.onreadystatechange = onreadystatechange;
            }

            xhr.open(method,url,async);
            if(method == "POST"){
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            }

            for(key in headers){
                if(headers.hasOwnProperty(key)){
                    xhr.setRequestHeader("requestType",headers[key]);
                }
            }
            xhr.send(data);

            if(!async){
                onreadystatechange();
            }
        } catch (e) {
            console.log("communicate failed");
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