/**
 * 代码编写采用单例模式
 * Created by sunshitao on 2016/1/20.
 */
define(function(require, exports, module){
    //初始化设置画布的宽高
    var execJob = require("app/execJob");
    var jobList = [
        require("plugin/kinematics"),
        require("plugin/rightControl"),
        require("plugin/particleControl"),
        require("plugin/loginComponent/login")
    ];

    execJob.exec(jobList);
});