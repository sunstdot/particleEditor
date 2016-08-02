/**
 * Created by sunshitao on 2016/8/2.
 */
import {DRAW_ENTITY} from '../../actions/particle'

export const drawEntity = (state={pos:{left:380,top:250},type:'circle'},action) => {
    switch (action.type){
        case DRAW_ENTITY:
            return Object.assign({},state,{
                pos:action.item.pos,
                type:action.item.type
            });
        default:
            return state;
    }
}