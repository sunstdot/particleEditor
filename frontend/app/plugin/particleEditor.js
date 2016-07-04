/**
 * 代码编写采用 ES6语法
 * Created by sunshitao on 2016/1/20.
 */
import "../css/range.css"
import "../css/particleEditor.css"
import "../css/bootstrap.min.css"
import "../css/vueModal.css"

//window.$ = require('jquery');
import execJob from "../execJob";
import kinematics from "./kinematics";
import rightControl from "./rightControl";
import leftControl from "./leftControl";
import timeline from "./timeline";
import extParticle from "./exportParticle";
import register from "./registerComponent/register";
require("jquery-ui");
//import login from "./loginComponent/login";

var jobList = [kinematics,rightControl,leftControl,timeline,extParticle,register];
execJob.exec(jobList);
