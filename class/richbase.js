/**
 * 在base的基础上继承出一个richbase实现更完备的组件基类
 * 可以扩充base基类的功能
 *
 * 主要实现以下功能:
 *      事件代理：不需要用户去找dom元素绑定监听，也不需要用户关心什么时候组件销毁
 *      模板渲染：用户不需要覆盖render方法,而是覆盖setup方法，可以通过在setup中调用render方法达到渲染对应html模板的效果
 *      单项绑定：通过setChunkData方法更新数据，同时更新html内容，不需要dom操作
 *  ......还有很多组件中可供优化的内容,
 *      比如：组件自动化加载渲染，局部刷新，比如父子组件的嵌套，再比如双向绑定，再比如实现ng-click这种风格的事件机制。
 *
 * Created by sunshitao on 2016/4/9.
 */
define(function(require,exports,module){

    var Base = new require("./Base")();

    var RichBase = Base.extend({
        EVENTS:{},
        template:'',
        init:function(config){
            //存储配置项
            this._config = config;
            //解析代理事件
            this._delegateEvent();
            this.setup();
        },
        //循环遍历EVENTS,将注册事件绑定到parentNode上
        _delegateEvent:function(){
            var self = this;
            var events = this.EVENTS || {};

            //认为parentNode是jquery对象  不同情况要做修改
            var parentNode = this.get('parentNode') || $(document.body);
            var eventObj,fn,type,select;
            for(select in events){
                if(events.hasOwnProperty(select)){
                    eventObj = events[select];
                    for(type in eventObj){
                        if(eventObj.hasOwnProperty(type)){
                            fn = eventObj[type];
                            parentNode.delegate(select,type,function(e){
                                fn.call(null,self,e);
                            })
                        }
                    }
                }
            }
        },
        //todo 仿照目前项目中模板解析语法做!!
        _parseTemplate:function(){

        },

        setup:function(){
            this.render();
        },
        //用来实现更新,不过一般项目框架都有数据双向绑定功能
        //实现一个简版的,只需要render时有数据的key有更新值,就可以实现刷新模板s
        setChunkData:function(key,value){

            var self = this;
            var data = self.get('_renderData');

            //更新对应的值
            data[key] = value;

            if(!self.template) return;

            var newHtmlNode = $(self._parseTemplate(self.template,data));

            //拿到存储的渲染后的节点
            var currentNode = self.get("_currentNode");
            if(!currentNode) return;
            //替换内容
            currentNode.replaceWith(newHtmlNode);
            self.set('_currentNode',newHtmlNode);
        },
        //使用data渲染模板，并将模板append到parentNode上
        render:function(data){
            var self = this;
            //将data存储起来
            self.set('_renderData',data);
            if(!self.template) return;

            var htmlNode = self._parseTemplate(self.template,data);

            var currentNode = $(htmlNode);
            var parentNode = self.get('parentNode') || $(document.body);

            //存储起来方便setChunkData调用
            //存储起来方便setChunkData调用
            self.set('_currentNode',currentNode);
            parentNode.append(currentNode);
        },
        destroy:function(){
            var self = this;
            self.off();
            //删除渲染好的节点
            self.get('_currentNode').remove();

            //去掉绑定的事件
            var events = self.EVENTS || {};
            var parentNode = self.get('parentNode') || $(document.body);
            var eventObj,fn,select,type;
            for(select in events){
                eventObj = events[select];
                for(type in eventObj){
                    fn = eventObj[type];
                    parentNode.undelegate(select,type,fn);
                }
            }
        }
    });

    return RichBase;

});

