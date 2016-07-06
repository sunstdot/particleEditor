/**
 * 键盘事件接收
 * 负责监听接受分发键盘事件
 * add by Sunst
 */
import event from "../event" 
let component = {};
let keyCode={
	27:'escPress'
};
var keyCodeHandler = e => {
	let type = keyCode[e.code];
	if(type)	{
		event.notify(type);
	}
}
let eventbind = ()=>{
	document.addEventListener('keydown',keyCodeHandler.bind(this));
}
component.exec = ()=>{
	eventbind();
}

export default component