import { combineReducers } from 'redux';
import User from './user_reducer';
import Eventos from './eventos_reducer';

const rootReducer = combineReducers({
    User,
    Eventos
})

export default rootReducer;