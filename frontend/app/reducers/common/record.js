import {RECORD_DATA} from '../../actions/record'
export const recorddata = (state={},action) => {
	switch (action.type){
		case RECORD_DATA:
			return action.item;
		default:
			return state;
	}
}