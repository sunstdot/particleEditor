/**
 * Created by sunshitao on 2016/7/26.
 */
import {combineReducers} from 'redux';
//todo ������󻯵�״̬
const defaultState = {};
import session from '../common/session'
import {drawEntity} from "../common/particle"
import {
    ADD_PARTICLE
} from '../../actions'

//componets ͨ�� dispatch({
//      type:TYPE,
//      value:'value'
// }) �����¼�
let state = (state = defaultState, action)=> {
    let newState;
    switch(action.type){
        case ADD_PARTICLE:
            return newState;
        default:
            return state;
    }
};
export default combineReducers({
    state,
    session,
    drawEntity
})