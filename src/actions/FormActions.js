import * as types from '../constants/ActionTypes';

export function changeDataForm(data) {
    return {
        type: types.CHANGE_DATA_FORM,
        data
    };
}

export function save() {
    return {
        type: types.SAVE_FORM
    }
}