/**
 * Created by sunshitao on 2016/7/26.
 */
export const ADD_PARTICLE = 'ADD_PARTICLE';
export const DRAW_ENTITY = "DRAW_ENTITY";
export const PARTICLE_TYPE='PARTICLE_TYPE';
export const PAINTER_SKETCH='PAINTER_SKETCH';

const drawEntity = item=>({type: DRAW_ENTITY, item});
const particleType = item=>({type:PARTICLE_TYPE,item});
const painterSketch = item=>({type:PAINTER_SKETCH,item});
export const particle = {
    drawEntity,
    particleType,
    painterSketch
};