import {SESSION_CREATE} from '../../actions/session'

export default function(state={},action){
    switch (action.type){
        case SESSION_CREATE:
            return Object.assign({},state,action.user);
        default:
            return state
    }
}