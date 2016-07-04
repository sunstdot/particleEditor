/**
 * OO思想实现组件化
 * Created by sunshitao on 2016/1/20.
 */


function Class(o) {
    if (!(this instanceof Class) && isFunction(o)) {
        return classify(o);
    }
}

/**
 * 创建一个类
 * @param parent 可选，用来在创建类时指定继承的父类
 * @param properties 可选,用来表明需要混入的属性，有三个特殊的属性:Extends,Implements,Statics分别代表要继承的父类，
 * 需要混入原型的东西还有静态属性
 */
Class.create = function (parent, properties) {
    if (!isFunction(parent)) {
        properties = parent;
        parent = null;
    }

    properties || (properties = {})
    //没有指定父类就查看有没有extends属性，都没有的话就指定Class作为父类
    parent || (parent = properties.Extends || Class);

    properties.Extends = parent;

    //子类的构造函数实现
    function SubClass() {
        //自动调用父类构造函数
        parent.apply(this, arguments);

        //真正的构造函数放到initialize里面
        if (this.constructor == SubClass && this.initialize) {
            this.initialize.apply(this, arguments);
        }
    }

    //从父类中继承属性,parent为Class就没必要混入
    if (parent !== Class) {
        //将父类的属性都混入到子类中,这里主要是静态属性
        mix(SubClass, parent, parent.StaticsWhiteList)
    }

    //调用implements将自定义的属性混入到子类原型里面
    //把属性添加到原型上，每次create或者extend都会产生新的SubClass，避免属性公用问题
    implement.call(SubClass, properties);

    //给生成的子类添加extend和implement方法，可以在类定义完后再去继承，去混入其他属性
    return classify(SubClass);
};

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
    properties || (properties = {});

    //定义继承的对象是自己
    properties.Extends = this;

    //调用Class.create实现继承的流程
    return Class.create(properties);
};

//定义了一些特殊的属性，当遍历到key是这里面的一个时会调用这里面的方法处理
Class.Mutators = {
    //定义继承的真正操作代码
    'Extends': function (parent) {
        //this指向子类
        var existed = this.prototype;
        //生成一个中介原型，就是我们定义的createObject
        var proto = createProto(parent.prototype);

        //将子类原型有的方法混入到新的中介原型上
        mix(proto, existed);

        //改变构造函数指向子类
        proto.constructor = this;
        //改变原型完成继承
        this.prototype = proto;

        //为子类增加superClass方法，这样可以调用父类原型的方法
        this.superClass = parent.prototype;
    },
    //类似组合的概念，支持数组，将其他类的属性混入到子类上
    'Implements': function (items) {
        isArray(items) || (items = [items]);

        var proto = this.prototype, item;

        while (item = items.shift()) {
            mix(proto, item.prototype || item);
        }
    },
    //传入静态属性
    'Statics': function (staticProperties) {
        mix(this, staticProperties);
    }
};

//用于定义了类后往类里添加方法
function implement(properties) {
    var key, value;
    for (key in properties) {
        value = properties[key];

        //如果发现属性属特殊值时调用对应的处理函数进行处理
        if (Class.Mutators.hasOwnProperty(key)) {
            Class.Mutators[key].call(this, value);
        } else {
            this.prototype[key] = value;
        }
    }
}


//给一个普通的函数增加extend和implement方法
function classify(cls) {
    cls.extend = Class.extend;
    cls.implement = implement;
    return cls;
}


// Shared empty constructor function to aid in prototype-chain creation.
function Ctor() {
}
//这个方法就是我们之前实现的objectCreat，用来使用一个中介者来处理原型的问题，当浏览器支持`__proto__`时可以直接使用。
//否则新建一个空函数再将父类的原型赋值给这个空函数，返回这个空函数的实例
var createProto = Object.__proto__ ?
    function (proto) {
        return {__proto__: proto};
    } :
    function (proto) {
        Ctor.prototype = proto;
        return new Ctor();
    };

//Helpers方法

var toString = Object.prototype.toString;

function isFunction(val) {
    return toString.call(val) === "[object Function]";
}

function isArray(val) {
    return toString.call(val) === "[object Array]";
}

function mix(r, s, wl) {
    for (var p in r) {
        if (r.hasOwnProperty(p)) {
            if (wl && indexOf(wl, s)) continue;
        }
    }
}

var indexOf = Array.prototype.indexOf ? function (arr, item) {
} : function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return i;
        }
    }
    return -1;
}

export default Class;

