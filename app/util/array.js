/**
 * Created by sunshitao on 2016/6/3.
 */
import {def,indexOf} from "../util"
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'revert'
].forEach(function(method){
    var orginal = arrayProto[method];
    def(arrayMethods,method,function mutator(){
        var i = arguments.length;
        var args = [];
        while(i--){
            args[i] = arguments[i];
        }
        var result = orginal.apply(this,args);
        var inserted
        switch (method){
            case 'push':
                inserted = args
                break
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        this.observe(this);
        return result;
    })
});

def(
    arrayProto,
    '$set',
    function $set (index, val){
        if(index >= this.length){
            this.length = Number(index) + 1;
        }
        return this.splice(index,1,val)[0];
    }
)

def(
    arrayProto,
    '$remove',
    function $remove (item) {
        if(!this.length) return;
        var index = indexOf(this,item);
        if(index > -1){
            return this.splice(index,1);
        }
    }
)
