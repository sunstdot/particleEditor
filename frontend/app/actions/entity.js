/**
 * Created by sunshitao on 2016/8/15.
 */
export const CHOOSE_ENTITY = "CHOOSE_ENTITY";
export const UPDATE_ENTITY_POS = "UPDATE_ENTITY_POS";

const chooseEntity = item =>({type:CHOOSE_ENTITY,item});
const updateEntityPos = item =>({type:UPDATE_ENTITY_POS,item})
export const entity = {
    chooseEntity,
    updateEntityPos
};