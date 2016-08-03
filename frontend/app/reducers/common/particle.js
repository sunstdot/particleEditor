/**
 * Created by sunshitao on 2016/8/2.
 */
import {DRAW_ENTITY,PARTICLE_TYPE,PAINTER_SKETCH} from '../../actions/particle'

export const drawEntity = (state={pos:{left:380,top:250},type:'circle'},action) => {
    switch (action.type){
        case DRAW_ENTITY:
            return Object.assign({},state,{
                pos:action.item.pos,
                type:action.item.type,
                size:action.item.size
            });
        default:
            return state;
    }
}
export const particleType = (state="",action) => {
	switch(action.type){
		case PARTICLE_TYPE:
			return action.item.type;
		default:
			return state;
	}
}
export const painterSketch = (state=null,action)=>{
    switch(action.type){
        case PAINTER_SKETCH:
            return action.painter;
        default:
            return state;
    }
}