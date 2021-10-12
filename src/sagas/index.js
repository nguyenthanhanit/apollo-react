import {all} from "redux-saga/effects";
import save from "./form";

export default function* rootSaga() {
    yield all([
        save()
    ])
}