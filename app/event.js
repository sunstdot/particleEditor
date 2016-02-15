/**
 * 添加事件注册机制
 * Created by sunshitao on 2016/1/21.
 */
define(function(require, exports, module){
    var event = (function(){
        var createHandlerList = function(){
            var list,delIndex,size = 0,arr = [];
            list = function(e){
                var i,handler,r,len = arr.length;
                for(i=len-1;i>=0;i--){
                    handler = arr[i];
                    try{
                        r = handler(e);
                    }catch (e){
                        new Error("Error Msg"+e+"\n handler"+handler);
                    }
                    if(r ==="BREAK"){
                        r = false;
                        break;
                    }
                }
                if (delIndex) {
                    for (i = delIndex + 1; i < len; ++i) {
                        handler = arr[i];
                        if (handler) {
                            arr[delIndex] = handler;
                            ++delIndex;
                        }
                    }
                    size = delIndex;
                    arr.length = delIndex;
                    delIndex = undefined;
                }
                return r;
            };
            /**
             * 获得事件处理器列表的长度
             */
            list.size = function () {
                return size;
            };
            /**
             * 添加事件处理器
             * @param  {int} handler
             */
            list.add = function (handler) {
                arr.push(handler);
                size += 1;
            };
            /**
             * 删除事件处理器
             * @param  {int} handler
             */
            list.remove = function (handler) {
                var i;
                for (i = arr.length - 1; i >= 0; --i) {
                    if (arr[i] === handler) {
                        arr[i] = undefined;
                        size -= 1;
                        if (delIndex === undefined || delIndex > i) {
                            delIndex = i;
                        }
                        return true;
                    }
                }
                return false;
            };
            return list;
        };

        /**
         * 创建事件处理器表
         * @return {list} 事件列表
         */
        var listener = (function(){
            var tableMod = {},table = {};
            /**
             * 获取事件长度
             */
            tableMod.size = function(){
                var i,n=0;
                for(i in table){
                    if(table.hasOwnProperty(i)){
                        ++n;
                    }
                }
                return n;
            };
            /**
             * 事件通知
             * @param {int | string} type事件类型
             * @param {object} e 事件参数
             */
            tableMod.notify = function(type,e){
                var list = table[type];
                if(list !== undefined){
                    return list(e);  //invoke list = function(e){}
                }
            };
            /**
             * 添加事件处理器
             * @param  {int} handler
             * @param  {int | string | array}   type 事件的类型
             */
            tableMod.add = function(type,handler){
                var i,list;
                if(!type || !handler){
                    return false;
                }
                if(_.isArray(type)){
                    for(i=0;i<type.length;i++){
                        list = table[type[i]];
                        if(!list){
                            table[type[i]] = list = createHandlerList();
                        }
                        list.add(handler);
                    }
                }else{
                    list = table[type];
                    if(!list){
                        table[type] = list = createHandlerList();
                    }
                    list.add(handler);
                }
                return true;
            };
            /**
             * 移出所有注册事件
             */
            tableMod.destroy = function(){
                var handler,type,list;
                for(type in table){
                    if(table.hasOwnProperty(type)){
                        list = table[type];
                        for(handler in list){
                            if(list.hasOwnProperty(handler)){
                                list.remove(handler);
                            }
                        }
                        delete table[type];
                    }
                }
            };

            tableMod.remove = function(type,handler){
                var list,i,r = false;

                if(!type && !handler){
                    return false;
                }

                list = table[type];
                if(!handler){
                    if(_.isArray(type)){
                        for(i=type.length;i>=0;i--){
                            delete table[type[i]];
                        }
                    }else{
                        delete table[type];
                    }
                    return true;
                }else if(!type){
                    for(i in table){
                        if(table.hasOwnProperty(i)){
                            if(list.remove(handler)){
                                r = true;
                                if(list.size() === 0){
                                    delete table[i];
                                }
                            }
                        }
                    }
                }else if(_.isArray(type)){
                    for(i=type.length;i>=0;i--){
                        list = table[type[i]];
                        if(list){
                            if(list.remove(handler)){
                                r = true;
                                if(list.size() === 0){
                                    delete table[type[i]];
                                }
                            }
                        }
                    }
                }else{
                    list = table[type];
                    if (list !== undefined) {
                        if (list.remove(handler)) {
                            r = true;
                            if (list.size() === 0) {
                                delete table[type];
                            }
                        }
                    }
                }
                return r;
            };
            return tableMod;
        }());

        return {
            /**
             * 注册事件处理器
             * @param {int | string | array}  type  事件名
             * @param {Function} handler  handler 事件处理函数
             */
            register:function(type,handler){

                listener.add(type,handler);
            },
            /**
             * 注销事件处理器
             * @param  {int | string | array | undefined}   type 事件类型
             * @param  {Function} handler     事件处理器
             */
            unregister:function(type,handler){

                listener.remove(type,handler);
            },
            /**
             * 事件通知
             */
            notify:function(eventName,eventParam){
                listener.notify(eventName, eventParam);
            }
        }

    }());

    module.exports = event;
});