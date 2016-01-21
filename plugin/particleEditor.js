/**
 * Created by sunshitao on 2016/1/20.
 */
define(function(require, exports, module){
    var execJob = require("app/execJob");
    var jobList = [
        require("plugin/kinematics"),
        require("plugin/textureSelect"),
        require("plugin/argControl")
    ];

    execJob.exec(jobList);
});