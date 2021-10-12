import {SHOW_MODAL} from "../constants/ActionTypes";

export default function modal(state = false, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return !state;
        default:
            return state;
    }
}