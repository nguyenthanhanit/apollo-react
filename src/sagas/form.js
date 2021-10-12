import {takeEvery, select, put, call} from 'redux-saga/effects';
import {SAVE_FORM, SAVE_SUCCESS} from "../constants/ActionTypes";

function* watch() {
    yield takeEvery(SAVE_FORM, save);
}

function* save() {
    try {
        const data = yield select(state => state.formReducers);
        // yield call();
        yield put({type: SAVE_SUCCESS})
    } catch (e) {
        console.log(e)
    }
}

export default watch;
