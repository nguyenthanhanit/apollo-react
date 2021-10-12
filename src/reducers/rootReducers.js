import {combineReducers} from 'redux';
import modalReducers from './modalReducers';
import formReducers from './formReducers';

const rootReducer = combineReducers({
    modalReducers,
    formReducers
});

export default rootReducer;