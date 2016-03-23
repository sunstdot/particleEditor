/**
 * 使用nodeJS读取login.html内容
 * node暴露出API给前端javascript使用
 * 或者干脆服务端渲染
 * Created by sunshitao on 2016/3/21.
 */

define(function (require, exports, module) {
    var Fs = require("fs");
    var readFiles = function(path,callback){

        //todo 应该加上对path的解析
        try{
            var fileContent = Fs.readFiles(path,'utf-8');
        }catch (e){
            new Error("the path can't analysis");
        }

        if(callback){
            callback(fileContent);
        }
    };
    module.exports = readFiles;
});


