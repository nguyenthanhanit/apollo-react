import {takeEvery, select, put} from 'redux-saga/effects';
import {SAVE_FORM, SAVE_SUCCESS} from "../constants/ActionTypes";

function* watch() {
    yield takeEvery(SAVE_FORM, save);
}

function* save() {
    try {
        yield select(state => state.formReducers);
        yield put({type: SAVE_SUCCESS})
    } catch (e) {
        console.log(e)
    }
}

export default watch;
