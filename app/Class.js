/**
 * OO思想实现组件化
 * Created by sunshitao on 2016/1/20.
 */
define(function(require,exports,module){

    function Class(o){
        if(!(this instanceof Class) && isFunction(o)){
            return classify(o);
        }
    }

    module.exports = Class;

    /**
     * 创建一个类
     * @param parent  可选，用来在创建类时指定继承的父类
     * @param properties 可选,用来表明需要混入的属性，有三个特殊的属性:Extends,Implements,Statics分别代表要继承的父类，需要混入原型的东西还有静态属性
     */
    Class.create = function(parent,properties){
        if(!isFunction(parent)){
            properties = parent;
            parent = null;
        }

        properties || (properties = {})
        //没有指定父类就查看有没有extends属性，都没有的话就指定Class作为父类
        parent || (parent = properties.Extends || Class)

        properties.Extends = parent;

        //子类的构造函数实现
        function SubClass(){
            //自动调用父类构造函数
            parent.apply(this,arguments);

            //真正的构造函数放到initialize里面
            if(this.constructor == SubClass && this.initialize){
                this.initialize.apply(this,arguments);
            }
        }

    }

    function isFunction(val){
        return toString.call(val) === "[object Function]"
    }

});
