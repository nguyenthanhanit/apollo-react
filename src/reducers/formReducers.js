import {CHANGE_DATA_FORM, SAVE_SUCCESS, SAVE_ERROR} from "../constants/ActionTypes";

export default function form(state = {}, action) {
    switch (action.type) {
        case CHANGE_DATA_FORM:
            return {
                ...state,
                ...action.data
            };
        case SAVE_SUCCESS:
            return {
                data: action.data,
                status: 200,
                message: 'Successfully',
            };
        case SAVE_ERROR:
            return {
                data: action.data,
                status: 500,
                message: 'Fail',
            };
        default:
            return state;
    }
}