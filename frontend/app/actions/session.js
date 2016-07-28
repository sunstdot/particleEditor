/**
 * manage session action
 * Created by sunshitao on 2016/7/28.
 */
import HOSTNAME from '../config'
import fetch from 'isomorphic-fetch'
import querystring from 'qs'
export const SESSION_CREATE = 'SESSION_CREATE';
export const SESSION_DESTROY = 'SESSION_DESTROY';

const createSync = prams =>fetch(HOSTNAME+'./session',{
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    },
    credentials:'include',
    body:querystring(params)
});

const create = params => (dispatch,getstate) => createSync(params).then(req => req.json()).then(user => dispatch({
    type:SESSION_CREATE,
    user
}))

export const session = {
    create
}