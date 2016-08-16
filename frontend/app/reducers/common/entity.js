/**
 * Created by sunshitao on 2016/8/15.
 */
import {CHOOSE_ENTITY,UPDATE_ENTITY_POS} from '../../actions/entity'

export const chooseEntity = (state = {},action) => {
    switch(action.type){
        case CHOOSE_ENTITY:
            return action.item;
        default:
            return state;
    }
}
export const updateEntityPos = (state = {},action) => {
    switch (action.type){
        case UPDATE_ENTITY_POS:
            return action.item;
        default :
            return state;
    }
}