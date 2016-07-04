/**
 * Created by sunshitao on 2016/1/20.
 */
let component = {};
component.exec = function(jobList){
    if(jobList.constructor !== Array){
        new Error('the jobList is not array');
    }
    try{
        let len = jobList.length;
        for(let i=0;i<len;i++){
            jobList[i].exec.apply(this);
        }
    }catch(e){}
};
export default component;
