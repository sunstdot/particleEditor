/**
 * Created by sunshitao on 2016/7/26.
 */
export const ADD_PARTICLE = 'ADD_PARTICLE';
export const DRAW_ENTITY = "DRAW_ENTITY";

const drawentity = item=>({type: DRAW_ENTITY, item});
export const particle = {
    drawentity
};