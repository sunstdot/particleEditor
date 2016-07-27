/**
 * Created by sunshitao on 2016/7/26.
 */
import {combineReducers} from 'redux';
//todo 引入抽象化的状态
const defaultState = {};

import {
    ADD_PARTICLE
} from '../../actions/'

//componets 通过 dispatch({
//      type:TYPE,
//      value:'value'
// }) 触发事件
let state = (state = defaultstate, action)=> {
    let newState;
    switch(action.type){
        case ADD_PARTICLE:
            return newState;
        default:
            return state;
    }

};
export default combineReducers({
    state
})