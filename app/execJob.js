/**
 * Created by sunshitao on 2016/1/20.
 */
define(function(require,exports,module){

    var component = {};
    component.exec = function(jobList){
        if(jobList.constructor !== Array){
            new Error('the jobList is not array');
        }

        try{
            var len = jobList.length;
            for(var i=0;i<len;i++){
                jobList[i].exec.apply(this);
            }
        }catch(e){}
    };

    module.exports = component;
});